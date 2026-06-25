"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiOutlineLogout } from "react-icons/hi";
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
    <div className="flex items-center justify-between border border-border bg-card/40 px-4 py-3 backdrop-blur-sm">
      {/* PROFILE */}
      <div className="flex items-center gap-3">
        <div
          className="relative h-10.5 w-10.5 shrink-0 overflow-hidden border border-border"
          style={{
            clipPath:
              "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
          }}
        >
          <Image
            src="https://res.cloudinary.com/doqb7czvi/image/upload/v1780245385/z8lab5tjam9x2cefuigl.jpg"
            alt="profile"
            width={42}
            height={42}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Payal Yadav
          </h3>
          <p className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
            Backend Developer
          </p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        disabled={loading}
        aria-label="Logout"
        className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
      >
        <HiOutlineLogout className="h-4 w-4" />
      </button>
    </div>
  );
}
