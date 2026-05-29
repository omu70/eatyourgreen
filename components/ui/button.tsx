import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        cta: "bg-cta text-white hover:bg-cta-hover shadow-card",
        outline: "border border-brand text-brand bg-white hover:bg-mist",
        ghost: "text-brand hover:bg-mist",
      },
      size: {
        default: "min-h-[48px] px-6 text-base",
        lg: "min-h-[56px] px-8 text-lg",
        pill: "min-h-[44px] px-5 text-sm",
      },
    },
    defaultVariants: { variant: "cta", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
