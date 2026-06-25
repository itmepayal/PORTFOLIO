"use client";

import { useState } from "react";

import SidebarHeader from "./SidebarHeader";
import SidebarSearch from "./SidebarSearch";
import SidebarMenu from "./SidebarMenu";
import SidebarProfile from "./SidebarProfile";

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
