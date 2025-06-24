const TypographyH1 = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      {children}
    </h1>
  );
};

const TypographyH2 = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
};

const TypographyH3 = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
};

const TypographyH4 = ({ children }: { children: React.ReactNode }) => {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
};

const TypographyP = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6">
      The king, seeing how much happier his subjects were, realized the error of
      his ways and repealed the joke tax.
    </p>
  );
};

const TypographyLead = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-muted-foreground text-xl">{children}</p>;
};

const TypographyBlockquote = ({ children }: { children: React.ReactNode }) => {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  );
};

const TypographySmall = ({ children }: { children: React.ReactNode }) => {
  return <small className="text-sm leading-none font-medium">{children}</small>;
};

const TypographyMuted = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-muted-foreground">{children}</p>;
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
