import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { BackgroundScene } from "@/components/layout/BackgroundScene";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

const schema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export function LoginPage() {
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    clearError();
    try {
      await login(values.email, values.password);
      navigate("/dashboard");
    } catch {
      /* error in context */
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <BackgroundScene />
      <motion.div
        className="w-full max-w-md rounded-3xl border border-white/10 bg-black/70 p-8 backdrop-blur-xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link to="/" className="text-xs text-zinc-500 hover:text-primary">
          ← Back to home
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-white">
          Welcome <span className="font-[family-name:var(--font-display)] italic text-primary">back</span>
        </h1>
        <p className="mt-2 text-sm text-muted">Sign in to manage your leads</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <motion.div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </motion.div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>
          {error && (
            <motion.p
              className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-red-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          No account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
