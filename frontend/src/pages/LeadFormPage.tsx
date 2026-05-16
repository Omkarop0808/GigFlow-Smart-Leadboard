import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LeadForm } from "@/components/leads/LeadForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getApiErrorMessage, leadsApi } from "@/services/api";
import type { Lead } from "@/types";

interface LeadFormPageProps {
  mode: "create" | "edit";
}

export function LeadFormPage({ mode }: LeadFormPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode !== "edit" || !id) return;
    const load = async () => {
      try {
        const { data } = await leadsApi.getById(id);
        setLead(data.data);
      } catch (err) {
        setError(getApiErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };
    void load();
  }, [mode, id]);

  const handleSubmit = async (values: {
    name: string;
    email: string;
    status: Lead["status"];
    source: Lead["source"];
  }) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (mode === "create") {
        await leadsApi.create(values);
      } else if (id) {
        await leadsApi.update(id, values);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p className="text-muted">Loading...</p>;
  }

  return (
    <motion.div
      className="mx-auto max-w-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{mode === "create" ? "Create Lead" : "Edit Lead"}</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="mb-4 text-sm text-destructive">{error}</p>}
          <LeadForm
            defaultValues={lead ?? undefined}
            onSubmit={handleSubmit}
            submitLabel={mode === "create" ? "Create Lead" : "Update Lead"}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
