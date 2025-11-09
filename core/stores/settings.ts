import { useSyncExternalStore } from 'react';

export type SettingsState = {
  language: string;
  currency: string;
  autoLockDuration: number;
  shareUsageData: boolean;
};

const DEFAULT_STATE: SettingsState = {
  language: 'en',
  currency: 'USD',
  autoLockDuration: 300,
  shareUsageData: false,
};

type Listener = () => void;

let state: SettingsState = DEFAULT_STATE;
const listeners = new Set<Listener>();

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setState(
  updater:
    | Partial<SettingsState>
    | ((prev: SettingsState) => Partial<SettingsState>),
) {
  const partial = typeof updater === 'function' ? updater(state) : updater;
  state = {
    ...state,
    ...partial,
  };
  listeners.forEach(listener => listener());
}

export function useSettingsStore<T>(selector: (current: SettingsState) => T): T {
  return useSyncExternalStore(subscribe, () => selector(state));
}

export const settingsActions = {
  setLanguage(language: string) {
    setState({ language });
  },
  setCurrency(currency: string) {
    setState({ currency });
  },
  setAutoLockDuration(autoLockDuration: number) {
    setState({ autoLockDuration });
  },
  setShareUsageData(shareUsageData: boolean) {
    setState({ shareUsageData });
  },
  toggleShareUsageData() {
    setState(prev => ({ shareUsageData: !prev.shareUsageData }));
  },
  resetApp() {
    state = { ...DEFAULT_STATE };
    listeners.forEach(listener => listener());
  },
};

export function getSettingsState(): SettingsState {
  return state;
}
