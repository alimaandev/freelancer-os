import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  size?: "sm" | "default";
  className?: string;
};

export function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: ButtonProps) {
  let base = "inline-flex items-center justify-center rounded-md font-medium transition-colors";
  base += variant === "outline" ? " border border-gray-200 bg-white text-gray-700" : " bg-sky-600 text-white";
  base += size === "sm" ? " px-3 py-1 text-sm" : " px-4 py-2";
  return (
    <button className={`${base} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

export default Button;
