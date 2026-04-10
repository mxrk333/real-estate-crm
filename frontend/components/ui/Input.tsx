import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-outline mb-1.5 px-0.5">
          {label}
        </label>
      )}
      <input
        className={`w-full p-2.5 bg-transparent border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-outline-variant/60 ${className}`}
        {...props}
      />
    </div>
  );
}
