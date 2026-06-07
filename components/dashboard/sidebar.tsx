"use client";

import { useState } from "react";

import SidebarHeader from "./sidebar-header";
import SidebarSearch from "./sidebar-search";
import SidebarMenu from "./sidebar-menu";
import SidebarProfile from "./sidebar-profile";

export default function Sidebar() {
  const [search, setSearch] = useState("");
  return (
    <aside className="hidden min-h-screen flex-col justify-between border-r border-border/40 bg-card/40 p-6 backdrop-blur-xl lg:flex">
      <div>
        <SidebarHeader />
        <SidebarSearch value={search} onChange={setSearch} />
        <SidebarMenu search={search} />
      </div>
      <SidebarProfile />
    </aside>
  );
}
