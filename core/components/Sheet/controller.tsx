import { Portal, PortalHost, PortalItem } from '@tamagui/portal';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import SheetComp from '.';

import type { SheetProps } from '.';


type PresentOptions = Omit<SheetProps, 'open' | 'onOpenChange' | 'children'> & {
  children: ReactNode;
  hostName?: string;
};

type SheetController = {
  present: (options: PresentOptions) => void;
  dismiss: () => void;
  isOpen: boolean;
};

const SheetControllerContext = createContext<SheetController | null>(null);
const SheetPortalHostContext = createContext<string | undefined>(undefined);

export function useSheetController() {
  const ctx = useContext(SheetControllerContext);
  if (!ctx) throw new Error('useSheetController must be used within <SheetProvider>');
  return ctx;
}

export function SheetHost({ name, children }: { name: string; children: ReactNode }) {
  return (
    <SheetPortalHostContext.Provider value={name}>
      <PortalHost name={name} />
      {children}
    </SheetPortalHostContext.Provider>
  );
}

export function SheetProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<PresentOptions | null>(null);

  const currentHostName = useContext(SheetPortalHostContext);

  const onOpenChange = useCallback((value: boolean) => setOpen(value), []);

  const present = useCallback((opts: PresentOptions) => {
    setOptions({ ...opts, hostName: opts.hostName ?? currentHostName });
    setOpen(true);
  }, [currentHostName]);

  const dismiss = useCallback(() => setOpen(false), []);

  const controller = useMemo<SheetController>(() => ({ present, dismiss, isOpen: open }), [dismiss, open, present]);

  return (
    <SheetControllerContext.Provider value={controller}>
      {children}
      {options ? (
        options.modal ? (
          <SheetComp open={open} onOpenChange={onOpenChange} {...options} />
        ) : options.hostName ? (
          <PortalItem hostName={options.hostName}>
            <SheetComp open={open} onOpenChange={onOpenChange} {...options} />
          </PortalItem>
        ) : (
          <Portal>
            <SheetComp open={open} onOpenChange={onOpenChange} {...options} />
          </Portal>
        )
      ) : null}
    </SheetControllerContext.Provider>
  );
}
