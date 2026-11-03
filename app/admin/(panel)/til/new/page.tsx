import Link from "next/link";
import { createTil } from "@/actions/admin/til";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { TilForm } from "@/components/admin/forms/til-form";
import { Button } from "@/components/ui/button";

export default function NewTilPage() {
  return (
    <div>
      <AdminPageHeader
        title="Nouveau TIL"
        description="Ajoutez une nouvelle entrée Today I Learned."
      />
      <TilForm
        action={createTil}
        defaultValues={{
          date: new Date().toISOString().split("T")[0],
          language: "ts",
        }}
      />
      <div className="mt-6">
        <Button variant="outline" asChild>
          <Link href="/admin/til">Annuler</Link>
        </Button>
      </div>
    </div>
  );
}
