"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Calendar, 
  LayoutDashboard, 
  ListTodo, 
  Settings, 
  Receipt, 
  Mail, 
  FileText,
  MessageSquare
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Activities", href: "/activities", icon: ListTodo },
  { name: "Expenses", href: "/expenses", icon: Receipt },
  { name: "Emails", href: "/emails", icon: Mail },
  { name: "Research", href: "/research", icon: FileText },
  { name: "Letters", href: "/letters", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-full bg-white/[0.03] backdrop-blur-3xl border-r border-white/10 flex flex-col p-4 pt-10 select-none">
      <div className="mb-8 px-4 text-center">
        <h1 className="text-2xl font-bold text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)] tracking-tighter uppercase">
          MurrabiOS
        </h1>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                isActive 
                  ? "bg-white/10 text-white border border-white/20 shadow-xl shadow-black/60" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className={`w-5 h-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-white" : ""}`} />
              <span className="font-semibold text-[15px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-wide">
                {item.name}
              </span>
              {isActive && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/40 blur-[1px]" />
              )}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-white/5 pt-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-2xl transition-all group"
        >
          <Settings className="w-5 h-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] group-hover:rotate-45 transition-transform duration-500" />
          <span className="font-semibold text-[15px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Settings</span>
        </Link>
      </div>
    </div>
  );
}
