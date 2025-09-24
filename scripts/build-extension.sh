#!/usr/bin/env bash

set -euo pipefail

ROOT="$(cd "$(dirname "$0")"/.. && pwd)"
DIST_DIR="$ROOT/dist"
BUILD_DIR="$ROOT/extension/build"
BOILERPLATE_DIR="$ROOT/scripts/extension-boilerplate"
BG_SRC="$ROOT/app/services/background/index.ts"
CS_SRC="$ROOT/app/services/inject/index.ts"
ZIP_OUT="$ROOT/extension.zip"

echo "[1/5] 清理与准备目录"
rm -rf "$BUILD_DIR" "$ZIP_OUT"
mkdir -p "$BUILD_DIR"

echo "[2/5] Expo 导出 Web → $DIST_DIR"
( cd "$ROOT" && $ROOT/node_modules/.bin/expo export -p web )
[ -f "$DIST_DIR/index.html" ] || { echo "❌ 未找到 $DIST_DIR/index.html，Expo 导出失败"; exit 1; }

echo "[3/5] 合并 boilerplate 与 Expo 产物"
cp -R "$BOILERPLATE_DIR"/. "$BUILD_DIR/"
cp -R "$DIST_DIR"/. "$BUILD_DIR/"

echo "[4/5] 打包 Background / Content（esbuild）"
$ROOT/node_modules/.bin/esbuild "$BG_SRC" --bundle --platform=browser --format=esm  --outfile="$BUILD_DIR/background.js"
$ROOT/node_modules/.bin/esbuild "$CS_SRC" --bundle --platform=browser --format=iife --outfile="$BUILD_DIR/content.js"

echo "[5/5] 生成页面并打 ZIP"
for p in popup options sidepanel; do cp "$BUILD_DIR/index.html" "$BUILD_DIR/$p.html"; done
( cd "$BUILD_DIR" && zip -qr "$ZIP_OUT" . )

echo "✅ 完成：$ZIP_OUT"
echo "提示：如需以解压方式加载，目录在：$BUILD_DIR（chrome://extensions → 加载已解压）"