import { cn } from "@/utils";
import { HTMLAttributes } from "react";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

const TypographyH1 = ({ children, className, ...rest }: TypographyProps) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
        className,
      )}
      {...rest}
    >
      {children}
    </h1>
  );
};

const TypographyH2 = ({ children, className, ...rest }: TypographyProps) => {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...rest}
    >
      {children}
    </h2>
  );
};

const TypographyH3 = ({ children, className, ...rest }: TypographyProps) => {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...rest}
    >
      {children}
    </h3>
  );
};

const TypographyH4 = ({ children, className, ...rest }: TypographyProps) => {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...rest}
    >
      {children}
    </h4>
  );
};

const TypographyP = ({ children, className, spacingTop = true, ...rest }: TypographyProps & { spacingTop?: boolean }) => {
  return (
    <p
      className={cn("leading-7",
        spacingTop && '[&:not(:first-child)]:mt-6',
        className)}
      {...rest}
    >
      {children}
    </p >
  );
};

const TypographyLead = ({ children, className, ...rest }: TypographyProps) => {
  return (
    <p className={cn("text-muted-foreground text-xl", className)} {...rest}>
      {children}
    </p>
  );
};

const TypographyBlockquote = ({
  children,
  className,
  ...rest
}: TypographyProps) => {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...rest}
    >
      {children}
    </blockquote>
  );
};

const TypographySmall = ({ children, className, ...rest }: TypographyProps) => {
  return (
    <small
      className={cn("text-sm leading-none font-medium", className)}
      {...rest}
    >
      {children}
    </small>
  );
};

const TypographyMuted = ({ children, className, ...rest }: TypographyProps) => {
  return (
    <p className={cn("text-muted-foreground", className)} {...rest}>
      {children}
    </p>
  );
};

export const Typography = {
  H1: TypographyH1,
  H2: TypographyH2,
  H3: TypographyH3,
  H4: TypographyH4,
  P: TypographyP,
  Lead: TypographyLead,
  Blockquote: TypographyBlockquote,
  Small: TypographySmall,
  Muted: TypographyMuted,
};
