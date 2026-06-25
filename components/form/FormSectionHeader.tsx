"use client";

type FormSectionHeaderProps = {
  title: string;
  description?: string;
  className?: string;
};

const FormSectionHeader = ({
  title,
  description,
  className = "",
}: FormSectionHeaderProps) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <h3 className="text-[1.05rem] font-bold leading-tight tracking-[-0.02em] text-foreground">
        {title}
      </h3>
      {description && (
        <p className="font-mono text-[0.7rem] text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
};

export default FormSectionHeader;
