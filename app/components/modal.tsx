import React from "react";

interface ModalProps {
  children: React.ReactNode;
  customWidth?: string; // tailwind width class, ej: 'w-[600px]', 'w-1/2'
}

export default function Modal({ children, customWidth = "w-full" }: ModalProps) {
  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className={`bg-white ${customWidth} max-w-screen-xl rounded-lg max-h-full overflow-y-auto flex items-center justify-center p-4`}
      >
        {children}
      </div>
    </div>
  );
}