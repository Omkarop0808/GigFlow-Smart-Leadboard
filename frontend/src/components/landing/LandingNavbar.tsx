import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
];

export function LandingNavbar() {
  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-card-border bg-card/60 backdrop-blur-xl"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link to="/" className="text-xl font-bold tracking-tight text-foreground">
          Gig<span className="font-[family-name:var(--font-display)] italic text-primary">flow</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <motion.div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="text-muted hover:text-foreground">
            <Link to="/login">Sign in</Link>
          </Button>
          <Button variant="secondary" size="sm" asChild className="rounded-full">
            <Link to="/register">Get started</Link>
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
}
