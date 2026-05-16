import { motion } from "framer-motion";
import { LayoutDashboard, LogOut, Moon, Sun, Users } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { BackgroundScene } from "./BackgroundScene";

const navItems = [
  { to: "/dashboard", label: "Leads", icon: LayoutDashboard },
  { to: "/dashboard/leads/new", label: "Create Lead", icon: Users },
];

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      className="relative min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <BackgroundScene />
      <motion.div
        className="absolute inset-0 -z-10 bg-black/80 light:bg-white/90"
        aria-hidden
      />

      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col border-r border-white/10 bg-black/60 p-6 backdrop-blur-xl lg:flex">
          <Link to="/dashboard" className="mb-10 block">
            <span className="text-2xl font-bold tracking-tight text-white">
              Gig<span className="font-[family-name:var(--font-display)] italic text-primary">flow</span>
            </span>
            <p className="mt-1 text-xs text-muted">Smart Leads Dashboard</p>
          </Link>

          <nav className="flex flex-1 flex-col gap-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/dashboard"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors",
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <motion.div
            className="mt-auto space-y-3 rounded-xl border border-white/10 bg-white/5 p-4"
            whileHover={{ scale: 1.01 }}
          >
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-muted">{user?.email}</p>
            <span className="inline-block rounded-full bg-primary/20 px-2 py-0.5 text-xs capitalize text-primary">
              {user?.role}
            </span>
          </motion.div>
        </aside>

        <motion.div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-4 backdrop-blur-md lg:px-8">
            <motion.h1
              className="text-lg font-semibold text-white lg:text-2xl"
              initial={{ x: -12, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              Lead <span className="font-[family-name:var(--font-display)] italic text-primary">Management</span>
            </motion.h1>
            <motion.div className="flex items-center gap-2" initial={{ x: 12, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={logout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </motion.div>
          </header>

          <main className="flex-1 p-4 lg:p-8">
            <Outlet />
          </main>
        </motion.div>
      </div>
    </motion.div>
  );
}
