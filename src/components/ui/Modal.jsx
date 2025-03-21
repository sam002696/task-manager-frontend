import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Button from "./Button";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <DialogBackdrop className="fixed inset-0 bg-gray-900/50" />

      {/* Modal Panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-lg bg-white shadow-lg p-6">
          {/* Modal Title */}
          {title && (
            <DialogTitle className="text-lg font-semibold text-gray-900 underline underline-offset-8">
              {title}
            </DialogTitle>
          )}

          {/* Modal Content */}
          <div className="mt-7">{children}</div>

          {/* Modal Actions */}
          <div className="mt-6 flex justify-end gap-3">
            {secondaryAction && (
              <Button variant="secondary" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button
                variant="primary"
                onClick={primaryAction.onClick}
                isLoading={primaryAction.loading}
              >
                {primaryAction.label}
              </Button>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
