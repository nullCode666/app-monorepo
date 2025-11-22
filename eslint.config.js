const { fixupPluginRules } = require('@eslint/compat');
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const reactNative = require('eslint-plugin-react-native');
const prettier = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const unusedImports = require('eslint-plugin-unused-imports');
const expoConfig = require('eslint-config-expo/flat');

module.exports = tseslint.config(
  {
    ignores: [
      '**/dist/*',
      '**/.expo/*',
      '**/node_modules/*',
      'babel.config.js',
      'metro.config.js',
      'jest.config.js',
      '**/*.d.ts',
    ],
  },
  // Base JS
  js.configs.recommended,
  // Expo Config
  ...expoConfig,

  // Custom Rules & Plugins
  {
    plugins: {
      'react-native': fixupPluginRules(reactNative),
      'unused-imports': unusedImports,
      'prettier': prettier,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      // Prettier
      ...prettierConfig.rules,
      'jsx-quotes': ['error', 'prefer-single'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'prettier/prettier': ['error', { singleQuote: true, jsxSingleQuote: true }],

      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/no-unescaped-entities': 'off',

      // React Native
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'error',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'off',
      'react-native/no-raw-text': 'off',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript
      '@typescript-eslint/no-unused-vars': 'off', // Handled by unused-imports
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-require-imports': 'off',

      // Unused Imports
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // General
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'warn',
      'prefer-const': 'error',
    },
  },

  // Restricted Imports Rule - Applied specifically to app/ and core/views/
  {
    files: ['app/**/*.{ts,tsx}', 'core/views/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react-native',
              message: 'Please import components from "@/core/components" instead of "react-native".',
              importNames: ['View', 'Text', 'Image', 'ScrollView', 'FlatList', 'SectionList', 'Pressable', 'TextInput', 'Button', 'Switch', 'SafeAreaView'],
            },
            {
              name: 'tamagui',
              message: 'Please import components from "@/core/components" instead of "tamagui".',
              importNames: ['View', 'Text', 'Image', 'ScrollView', 'Stack', 'XStack', 'YStack', 'Button', 'Input', 'Switch', 'Form', 'Anchor', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Paragraph', 'Label', 'Spinner'],
            },
          ],
          patterns: [
            {
              group: ['react-native/Libraries/Components/*'],
              message: 'Please import components from "@/core/components" instead.',
            },
          ],
        },
      ],
    },
  }
);
