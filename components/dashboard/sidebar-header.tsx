export default function SidebarHeader() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-black text-primary-foreground">
        P
      </div>

      <div>
        <h1 className="text-lg font-bold">Payal Yadav</h1>

        <p className="text-sm text-muted-foreground">Backend Engineer</p>
      </div>
    </div>
  );
}
