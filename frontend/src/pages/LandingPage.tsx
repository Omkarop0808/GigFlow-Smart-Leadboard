import { motion } from "framer-motion";
import { BarChart3, Filter, Shield, Zap } from "lucide-react";
import { Navigate } from "react-router-dom";
import { BackgroundScene } from "@/components/layout/BackgroundScene";
import { CtaButton } from "@/components/landing/CtaButton";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { ServiceCard } from "@/components/landing/ServiceCard";
import { useAuth } from "@/context/AuthContext";

const floatingBadges = [
  { label: "Agency", className: "bg-primary/90 text-black" },
  { label: "Expert", className: "bg-white text-black" },
  { label: "Innovative", className: "bg-accent/90 text-black" },
];

const services = [
  { index: "01", title: "Lead Capture", tags: ["Forms", "Import", "API"] },
  { index: "02", title: "Smart Filtering", tags: ["Status", "Source", "Search"] },
  { index: "03", title: "Pipeline Analytics", tags: ["Stats", "Export", "Reports"] },
  { index: "04", title: "Team Access", tags: ["Admin", "Sales", "RBAC"] },
];

const features = [
  {
    icon: Filter,
    title: "Advanced filters",
    desc: "Combine status, source, search, and sort — exactly as recruiters evaluate.",
  },
  {
    icon: BarChart3,
    title: "Paginated insights",
    desc: "Server-side pagination with 10 leads per page and full metadata.",
  },
  {
    icon: Shield,
    title: "Secure by default",
    desc: "JWT auth, bcrypt passwords, and role-based access for admins and sales.",
  },
  {
    icon: Zap,
    title: "Built for speed",
    desc: "Debounced search, CSV export, and a responsive dashboard UI.",
  },
];

export function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <motion.div className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <BackgroundScene />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,_rgba(255,140,0,0.08),_transparent_55%)]" />
      <LandingNavbar />

      {/* Hero */}
      <section id="home" className="relative px-4 pb-24 pt-32 lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-5xl text-center">
          {floatingBadges.map((badge, i) => (
            <motion.span
              key={badge.label}
              className={`absolute hidden rounded-full px-3 py-1 text-xs font-semibold lg:inline-block ${badge.className}`}
              style={{
                top: `${18 + i * 8}%`,
                left: i === 0 ? "8%" : i === 1 ? "78%" : "12%",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              {badge.label}
            </motion.span>
          ))}

          <motion.p
            className="text-xs uppercase tracking-[0.3em] text-zinc-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Smart Leads Dashboard
          </motion.p>
          <motion.h1
            className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Designing{" "}
            <span className="text-gradient">Digital</span>{" "}
            <span className="font-[family-name:var(--font-display)] italic font-normal text-white">
              pipelines
            </span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Track, qualify, and convert leads with a MERN-powered dashboard built for
            modern sales teams — filters, roles, exports, and a premium experience.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <CtaButton to="/register">Get Started</CtaButton>
            <CtaButton to="/login" variant="secondary">
              Sign in
            </CtaButton>
          </motion.div>

          <motion.div
            className="mx-auto mt-16 h-px max-w-3xl bg-gradient-to-r from-transparent via-primary/60 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-widest text-primary">About Gigflow</p>
          <motion.h2
            className="mt-4 text-2xl font-medium leading-relaxed text-zinc-300 sm:text-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            We help teams turn scattered contacts into a clear pipeline — with the
            filtering depth and API quality internship reviewers expect.
          </motion.h2>
          <div className="mt-8 flex justify-center">
            <CtaButton to="/register" variant="secondary">
              Start free
            </CtaButton>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-y border-white/5 bg-white/[0.02] px-4 py-20 lg:px-8">
        <motion.div
          className="mx-auto max-w-7xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-center text-3xl font-bold sm:text-4xl">
            Built for{" "}
            <span className="font-[family-name:var(--font-display)] italic text-primary">
              performance
            </span>
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="glass-card p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <motion.div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </motion.div>
                <h3 className="mt-4 font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Services */}
      <section id="services" className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="max-w-lg text-3xl font-bold sm:text-4xl">
              Services that are{" "}
              <span className="font-[family-name:var(--font-display)] italic text-primary">
                tailored
              </span>
            </h2>
            <CtaButton to="/register">Open dashboard</CtaButton>
          </motion.div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <ServiceCard key={s.index} {...s} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 pb-24 pt-8 lg:px-8">
        <motion.div
          className="mx-auto max-w-4xl rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-zinc-950 to-black p-10 text-center sm:p-14"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to manage leads like a pro?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Sign in with the seeded admin account or register as sales. Your pipeline
            awaits.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CtaButton to="/login">Sign in</CtaButton>
            <CtaButton to="/register" variant="white">
              Get started free
            </CtaButton>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-white/5 px-4 py-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Gigflow · Smart Leads Dashboard · MERN Assignment
      </footer>
    </motion.div>
  );
}
