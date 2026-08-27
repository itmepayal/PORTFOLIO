import Link from "next/link";

type AuthFormFooterProps = {
  prompt: string;
  linkHref: string;
  linkLabel: string;
};

export const AuthFormFooter = ({
  prompt,
  linkHref,
  linkLabel,
}: AuthFormFooterProps) => (
  <div className="border-t border-border px-7 py-5 text-center sm:px-8">
    <p className="font-mono text-[0.68rem] text-muted-foreground">
      {prompt}{" "}
      <Link
        href={linkHref}
        className="font-medium text-primary no-underline hover:opacity-80"
      >
        {linkLabel}
      </Link>
    </p>
  </div>
);
