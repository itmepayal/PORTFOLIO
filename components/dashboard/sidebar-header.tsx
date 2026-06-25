export default function SidebarHeader() {
  return (
    <div className="flex items-center gap-4">
      <div
        className="relative flex h-14 w-14 shrink-0 items-center justify-center border border-border bg-linear-to-br from-primary to-secondary-foreground font-mono text-xl font-bold text-white"
        style={{
          clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
        }}
      >
        P
      </div>
      <div>
        <h1 className="bg-linear-to-br from-primary to-secondary-foreground bg-clip-text text-lg font-bold tracking-tight text-transparent">
          Payal Yadav
        </h1>
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted-foreground">
          Backend Engineer
        </p>
      </div>
    </div>
  );
}
