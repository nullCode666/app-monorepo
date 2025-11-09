export type LanguageOption = {
  value: string;
  label: string;
};

export const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  { value: 'auto', label: '自动' },
  { value: 'en', label: 'English' },
  { value: 'zh-Hans', label: '简体中文' },
  { value: 'zh-Hant-HK', label: '繁體中文（香港）' },
  { value: 'zh-Hant-TW', label: '繁體中文（臺灣）' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'de', label: 'Deutsch' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'hi', label: 'हिन्दी' },
  { value: 'id', label: 'Bahasa Indonesia' },
] as const;

export const CURRENCY_OPTIONS = [
  { value: 'USD', label: '美元 (USD)' },
  { value: 'CNY', label: '人民币 (CNY)' },
  { value: 'HKD', label: '港币 (HKD)' },
  { value: 'JPY', label: '日元 (JPY)' },
  { value: 'KRW', label: '韩元 (KRW)' },
  { value: 'EUR', label: '欧元 (EUR)' },
  { value: 'GBP', label: '英镑 (GBP)' },
  { value: 'INR', label: '印度卢比 (INR)' },
  { value: 'IDR', label: '印尼盾 (IDR)' },
] as const;

export const AUTO_LOCK_OPTIONS = [
  { value: 0, label: '立即' },
  { value: 30, label: '30 秒' },
  { value: 60, label: '1 分钟' },
  { value: 120, label: '2 分钟' },
  { value: 300, label: '5 分钟' },
  { value: 600, label: '10 分钟' },
] as const;

export function getLanguageLabel(value: string) {
  return LANGUAGE_OPTIONS.find(item => item.value === value)?.label ?? value;
}

export function getCurrencyLabel(value: string) {
  return CURRENCY_OPTIONS.find(item => item.value === value)?.label ?? value;
}

export function getAutoLockLabel(value: number) {
  return AUTO_LOCK_OPTIONS.find(item => item.value === value)?.label ?? `${value} 秒`;
}
