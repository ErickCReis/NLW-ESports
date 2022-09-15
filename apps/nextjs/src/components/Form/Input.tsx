import { InputHTMLAttributes } from "react";

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      {...props}
      className="rounded bg-zinc-900 px-4 py-3 text-sm placeholder:text-zinc-500"
    />
  );
};
