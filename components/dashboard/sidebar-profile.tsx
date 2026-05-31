"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function SidebarProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/account/logout", {
        method: "POST",
      });

      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        throw new Error(data.message || "Logout failed");
      }

      toast.success("Logged out successfully");

      router.push("/auth/login");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-card/60 px-4 py-3">
      {/* PROFILE */}
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

      <button
        onClick={handleLogout}
        disabled={loading}
        className="rounded-lg p-2 transition hover:bg-accent disabled:opacity-50"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}
