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
    <div className={`space-y-1 ${className}`}>
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default FormSectionHeader;
