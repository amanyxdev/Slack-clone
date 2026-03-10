
import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

type ConfirmOptions = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  confirmText?: React.ReactNode;
  cancelText?: React.ReactNode;
  destructive?: boolean;
};

type ConfirmFn = (options?: ConfirmOptions) => Promise<boolean>;

const DEFAULTS: Required<Pick<ConfirmOptions, "title" | "description" | "confirmText" | "cancelText" | "destructive">> = {
  title: "Are you absolutely sure?",
  description: "This action cannot be undone.",
  confirmText: "Confirm",
  cancelText: "Cancel",
  destructive: true,
};

export const useConfirm = (baseOptions?: ConfirmOptions) => {
  const [open, setOpen] = React.useState(false);
  const resolverRef = React.useRef<((value: boolean) => void) | null>(null);
  const optionsRef = React.useRef<ConfirmOptions | undefined>(baseOptions);

  React.useEffect(() => {
    optionsRef.current = baseOptions;
  }, [baseOptions]);

  const confirm: ConfirmFn = React.useCallback((options) => {
    const merged = {
      ...DEFAULTS,
      ...(optionsRef.current ?? {}),
      ...(options ?? {}),
    } satisfies Required<ConfirmOptions>;

    optionsRef.current = merged;
    setOpen(true);

    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const finish = React.useCallback((value: boolean) => {
    setOpen(false);
    resolverRef.current?.(value);
    resolverRef.current = null;
  }, []);

  const ConfirmDialog = React.useCallback(() => {
    const opts = { ...DEFAULTS, ...(optionsRef.current ?? {}) };

    return (
      <Dialog open={open} onOpenChange={(v: boolean) => (!v ? finish(false) : setOpen(true))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{opts.title}</DialogTitle>
            <DialogDescription>{opts.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => finish(false)}>
              {opts.cancelText}
            </Button>
            <Button
              type="button"
              onClick={() => finish(true)}
              className={opts.destructive ? "bg-rose-600 text-white hover:bg-rose-700" : undefined}
            >
              {opts.confirmText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }, [finish, open]);

  return [ConfirmDialog, confirm] as const;
};
