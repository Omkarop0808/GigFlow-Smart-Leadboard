import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Lead, LeadSource, LeadStatus } from "@/types";

const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  status: z.enum(["New", "Contacted", "Qualified", "Lost"]),
  source: z.enum(["Website", "Instagram", "Referral"]),
});

type LeadFormValues = z.infer<typeof leadSchema>;

interface LeadFormProps {
  defaultValues?: Partial<Lead>;
  onSubmit: (values: LeadFormValues) => Promise<void>;
  submitLabel?: string;
  isSubmitting?: boolean;
}

export function LeadForm({
  defaultValues,
  onSubmit,
  submitLabel = "Save Lead",
  isSubmitting,
}: LeadFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      email: defaultValues?.email ?? "",
      status: (defaultValues?.status as LeadStatus) ?? "New",
      source: (defaultValues?.source as LeadSource) ?? "Website",
    },
  });

  const status = watch("status");
  const source = watch("source");

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <motion.div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={status} onValueChange={(v) => setValue("status", v as LeadStatus)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(["New", "Contacted", "Qualified", "Lost"] as LeadStatus[]).map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Source</Label>
          <Select value={source} onValueChange={(v) => setValue("source", v as LeadSource)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(["Website", "Instagram", "Referral"] as LeadSource[]).map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/20 text-xs">
            »
          </span>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </motion.div>
    </motion.form>
  );
}
