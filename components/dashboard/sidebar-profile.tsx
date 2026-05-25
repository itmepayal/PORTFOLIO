import Image from "next/image";
import { LogOut } from "lucide-react";

export default function SidebarProfile() {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-card/60 px-4 py-3">
      <div className="flex items-center gap-3">
        <Image
          src="https://i.pravatar.cc/100"
          alt="profile"
          width={42}
          height={42}
          className="rounded-full"
        />

        <div>
          <h3 className="text-sm font-semibold">Payal Yadav</h3>

          <p className="text-xs text-muted-foreground">Backend Developer</p>
        </div>
      </div>

      <button className="rounded-lg p-2 transition hover:bg-accent">
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}
