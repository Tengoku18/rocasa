'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './Icon';
import { Button } from './Button';

type SuccessModalProps = {
  open: boolean;
  message: string;
  title?: string;
  onClose: () => void;
};

export function SuccessModal({
  open,
  message,
  title = 'Enquiry sent',
  onClose,
}: SuccessModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape, lock body scroll, and move focus into the dialog.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // Portals require a DOM target; skip on the server.
  if (typeof document === 'undefined' || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <div
        className="absolute inset-0 bg-[#08162D]/60 backdrop-blur-sm motion-safe:animate-[overlayIn_0.2s_ease-out]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-[0_32px_64px_-24px_rgba(8,22,45,0.5)] outline-none motion-safe:animate-[modalIn_0.25s_ease-out]"
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#FAF0BC] text-[#08162D]">
          <Icon name="shield-check" size={28} />
        </span>
        <h2
          id="success-modal-title"
          className="mt-5 font-[family-name:var(--font-open-sans)] text-2xl font-bold text-[#08162D]"
        >
          {title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#475569]">{message}</p>
        <div className="mt-7">
          <Button type="button" variant="primary" size="md" fullWidth onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
