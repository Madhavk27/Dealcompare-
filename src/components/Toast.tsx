import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
}

export const Toast: React.FC<ToastProps> = ({ toasts }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none font-mono">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#121212] text-white p-3.5 rounded border border-white/20 shadow-2xl flex items-center gap-3 text-xs font-bold uppercase tracking-wider animate-slideDown"
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-[#00FF66] shrink-0 stroke-[2.5px]" />
          ) : toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-[#FF3B30] shrink-0 stroke-[2.5px]" />
          ) : (
            <Info className="w-4 h-4 text-white shrink-0 stroke-[2.5px]" />
          )}
          <span className="grow">{toast.text}</span>
        </div>
      ))}
    </div>
  );
};
