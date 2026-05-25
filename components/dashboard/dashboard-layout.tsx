import Sidebar from "./sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-background text-foreground">
      {/* BACKGROUND */}

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-30 -top-30 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="absolute -bottom-30 -right-30 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="grid lg:grid-cols-[300px_1fr]">
        <Sidebar />

        <main className="p-6">{children}</main>
      </div>
    </section>
  );
}
