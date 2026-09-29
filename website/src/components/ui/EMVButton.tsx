
"use client";

import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export default function EMVButton({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const variants = {
    primary:
      "bg-teal-500 text-[#07121f] hover:bg-teal-400",

    secondary:
      "bg-[#082028] border border-teal-500/20 text-teal-300 hover:bg-[#0a2630]",

    ghost:
      "text-teal-300 hover:bg-teal-500/10",
  };

  return (
    <button
      {...props}
      className={`rounded-xl px-4 py-3 font-medium transition duration-200 ${variants[variant]} ${className}`}
    />
  );
}