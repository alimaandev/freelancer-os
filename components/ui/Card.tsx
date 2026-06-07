import React from "react";

type CardVariant = "default" | "glassDark";

export function Card({
  children,
  className = "",
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: CardVariant }) {
  const styles: Record<CardVariant, string> = {
    default: "bg-white border border-gray-100 rounded-lg shadow-sm",
    glassDark:
      "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_60px_-35px_rgba(0,0,0,0.55)]",
  };

  return (
    <div className={`${styles[variant]} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${"px-4 py-3 border-b border-white/10"} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`${"p-4"} ${className}`.trim()} {...props}>{children}</div>;
}

export function CardTitle({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={`${"text-lg font-medium"} ${className}`.trim()} {...props}>{children}</h3>;
}

export function CardDescription({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`${"text-sm text-white/55"} ${className}`.trim()} {...props}>{children}</p>;
}

export default Card;
