import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Badge, sourceToBadgeVariant, statusToBadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getApiErrorMessage, leadsApi } from "@/services/api";
import type { Lead } from "@/types";

export function LeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
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
  }, [id]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (error || !lead) {
    return (
      <motion.div className="text-center py-16">
        <p className="text-destructive">{error ?? "Lead not found"}</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link to="/dashboard">Back to dashboard</Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="mx-auto max-w-2xl space-y-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Button variant="ghost" size="sm" asChild>
        <Link to="/dashboard" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{lead.name}</CardTitle>
          <p className="text-muted">{lead.email}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant={statusToBadgeVariant(lead.status)}>{lead.status}</Badge>
            <Badge variant={sourceToBadgeVariant(lead.source)}>{lead.source}</Badge>
          </div>
          <p className="text-sm text-muted">
            Created {new Date(lead.createdAt).toLocaleString()}
          </p>
          {lead.createdBy && (
            <p className="text-sm text-zinc-400">
              By {lead.createdBy.name} ({lead.createdBy.email})
            </p>
          )}
          <Button asChild>
            <Link to={`/dashboard/leads/${lead._id}/edit`}>Edit Lead</Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
