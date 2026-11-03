import Link from "next/link";
import { createProject } from "@/actions/admin/projects";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProjectForm } from "@/components/admin/forms/project-form";
import { Button } from "@/components/ui/button";

export default function NewProjectPage() {
  return (
    <div>
      <AdminPageHeader
        title="Nouveau projet"
        description="Ajoutez un nouveau projet à votre portfolio."
      />
      <ProjectForm action={createProject} />
      <div className="mt-6">
        <Button variant="outline" asChild>
          <Link href="/admin/projects">Annuler</Link>
        </Button>
      </div>
    </div>
  );
}
