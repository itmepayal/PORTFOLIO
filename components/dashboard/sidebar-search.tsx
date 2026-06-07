import { Search } from "lucide-react";

interface SidebarSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SidebarSearch({ value, onChange }: SidebarSearchProps) {
  return (
    <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-background/50 px-4 py-3">
      <Search className="h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search menu..."
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}
