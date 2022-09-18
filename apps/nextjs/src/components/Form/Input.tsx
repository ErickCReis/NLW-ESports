import { InputHTMLAttributes } from "react";

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export const Input: React.FC<Props> = (props) => {
  return (
    <input
      {...props}
      className={`rounded border bg-zinc-900 px-4 py-3 text-sm placeholder:text-zinc-500 ${
        !!props.error ? "border-red-500" : "border-transparent"
      }`}
    />
  );
};
