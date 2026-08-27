import PageContainer from "@/components/dashboard/pages/PageContainer";

type DashboardResourceLoaderProps = {
  label: string;
};

export const DashboardResourceLoader = ({ label }: DashboardResourceLoaderProps) => (
  <PageContainer>
    <div className="flex min-h-100 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin border-2 border-border border-t-primary" />
        <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  </PageContainer>
);
