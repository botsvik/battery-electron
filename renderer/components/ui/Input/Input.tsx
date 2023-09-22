import { forwardRef, InputHTMLAttributes, SVGAttributes } from "react";

import { cn } from "@renderer/utils";

// TODO: Move somewhere else
type IconProps = SVGAttributes<SVGElement> & {
  children?: never;
  color?: string;
};

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leadingIcon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leadingIcon: LeadingIcon, className, type, ...props }, ref) => {
    return (
      <div className="relative">
        {LeadingIcon && (
          <LeadingIcon className="text-muted-foreground absolute top-1/2 mx-2 -translate-y-1/2 w-5 h-5" />
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            LeadingIcon && "pl-8",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
