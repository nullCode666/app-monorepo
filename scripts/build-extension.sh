#!/usr/bin/env bash
# scripts/build-extension.sh
# Expo → dist/web → 合并样板 → 修正 _expo → 打包 SW/Content → 生成 popup/options/sidepanel
# → dist/extension 以及 dist/extension/extension.zip

set -euo pipefail

ROOT="$(cd "$(dirname "$0")"/.. && pwd)"

DIST_ROOT="$ROOT/dist"
DIST_WEB="$DIST_ROOT/web"
EXT_DIR="$DIST_ROOT/extension"

BOILERPLATE_DIR="$ROOT/scripts/extension-boilerplate"
BG_SRC="$ROOT/app/services/background/index.ts"
CS_SRC="$ROOT/app/services/inject/index.ts"
ZIP_OUT="$DIST_ROOT/extension.zip"

EXPO_BIN="$ROOT/node_modules/.bin/expo"
ESBUILD_BIN="$ROOT/node_modules/.bin/esbuild"

echo "[1/6] 清理与准备目录"
rm -rf "$DIST_WEB" "$EXT_DIR" "$ZIP_OUT"
mkdir -p "$DIST_ROOT" "$DIST_WEB" "$EXT_DIR"

echo "[2/6] Expo 导出 Web → dist/web"

TMP_WEB="$ROOT/.expo-web-tmp"
rm -rf "$TMP_WEB"
( cd "$ROOT" && "$EXPO_BIN" export -p web )
[ -f "$DIST_ROOT/index.html" ] || { echo "❌ 未找到 $DIST_ROOT/index.html，Expo 导出失败"; exit 1; }
mv "$DIST_ROOT" "$TMP_WEB"
mkdir -p "$DIST_ROOT" "$DIST_WEB"
cp -R "$TMP_WEB"/. "$DIST_WEB"/
rm -rf "$TMP_WEB"

echo "[3/6] 合并扩展样板与 Expo 产物 → dist/extension"
cp -R "$BOILERPLATE_DIR"/. "$EXT_DIR"/
cp -R "$DIST_WEB"/. "$EXT_DIR"/

# —— 关键修正：_expo 目录与所有引用（仅用 shell/标准工具）——
if [ -d "$EXT_DIR/_expo" ]; then
  echo "[3.1] 重命名 _expo → expo"
  mv "$EXT_DIR/_expo" "$EXT_DIR/expo"
fi
echo "[3.2] 全量替换文件中的路径（/_expo/ 与 _expo/）为 expo/"
# 使用 perl 保证 macOS/Linux 一致的原地替换行为
find "$EXT_DIR" -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.json" -o -name "*.map" \) -print0 \
| xargs -0 perl -i -pe 's{/_expo/}{/expo/}g; s{([\"\047=])_expo/}{$1expo/}g'

# 清理扩展不需要或可能冲突的文件（若存在）
rm -f "$EXT_DIR/+not-found.html" "$EXT_DIR/_sitemap.html" "$EXT_DIR/_sitemap.json" "$EXT_DIR/sitemap.xml"

echo "[4/6] 打包 Background / Content（esbuild）→ dist/extension"
"$ESBUILD_BIN" "$BG_SRC" --bundle --platform=browser --format=esm  --outfile="$EXT_DIR/background.js"
"$ESBUILD_BIN" "$CS_SRC" --bundle --platform=browser --format=iife --outfile="$EXT_DIR/content.js"

echo "[5/6] 生成扩展页面（popup/options/sidepanel）"
for p in popup options sidepanel; do cp "$EXT_DIR/index.html" "$EXT_DIR/$p.html"; done

echo "[6/6] 打 ZIP → $ZIP_OUT"
( cd "$EXT_DIR" && zip -qr "$ZIP_OUT" . )

echo "✅ 构建完成"
echo "• Expo Web：$DIST_WEB"
echo "• 扩展目录：$EXT_DIR"
echo "• 扩展压缩包：$ZIP_OUT"
echo "提示：也可在 chrome://extensions 选择“加载已解压的扩展”，指向 $EXT_DIR"