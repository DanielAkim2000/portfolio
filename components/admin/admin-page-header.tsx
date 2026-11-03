import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminPageHeader({
  title,
  description,
  createHref,
  createLabel,
}: {
  title: string;
  description: string;
  createHref?: string;
  createLabel?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {createHref && createLabel && (
        <Button asChild>
          <Link href={createHref}>
            <Plus className="size-4" />
            {createLabel}
          </Link>
        </Button>
      )}
    </div>
  );
}
