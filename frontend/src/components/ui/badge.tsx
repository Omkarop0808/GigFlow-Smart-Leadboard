import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        new: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
        contacted: "bg-yellow-500/20 text-yellow-200 border border-yellow-500/30",
        qualified: "bg-emerald-500/20 text-emerald-200 border border-emerald-500/30",
        lost: "bg-red-500/20 text-red-200 border border-red-500/30",
        website: "bg-blue-500/20 text-blue-200 border border-blue-500/30",
        instagram: "bg-pink-500/20 text-pink-200 border border-pink-500/30",
        referral: "bg-purple-500/20 text-purple-200 border border-purple-500/30",
        default: "bg-white/10 text-zinc-300 border border-white/20",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export function statusToBadgeVariant(status: string): BadgeProps["variant"] {
  const map: Record<string, BadgeProps["variant"]> = {
    New: "new",
    Contacted: "contacted",
    Qualified: "qualified",
    Lost: "lost",
  };
  return map[status] ?? "default";
}

export function sourceToBadgeVariant(source: string): BadgeProps["variant"] {
  const map: Record<string, BadgeProps["variant"]> = {
    Website: "website",
    Instagram: "instagram",
    Referral: "referral",
  };
  return map[source] ?? "default";
}
