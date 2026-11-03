import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminProject, updateProject } from "@/actions/admin/projects";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProjectForm } from "@/components/admin/forms/project-form";
import { Button } from "@/components/ui/button";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getAdminProject(id);

  if (!project) {
    notFound();
  }

  const titleFr = project.title.find((item) => item.locale === "fr");
  const titleEn = project.title.find((item) => item.locale === "en");
  const descriptionFr = project.description.find((item) => item.locale === "fr");
  const descriptionEn = project.description.find((item) => item.locale === "en");

  return (
    <div>
      <AdminPageHeader
        title="Modifier le projet"
        description={titleFr?.title ?? project.id}
      />
      <ProjectForm
        action={updateProject.bind(null, id)}
        defaultValues={{
          oldSlug: project.slug,
          link: project.link ?? "",
          githubLink: project.githubLink.join(", "),
          images: project.images.join(", "),
          titleFr: titleFr?.title ?? "",
          titleEn: titleEn?.title ?? "",
          subtitleFr: titleFr?.subtitle ?? "",
          subtitleEn: titleEn?.subtitle ?? "",
          descriptionFr: descriptionFr?.content ?? "",
          descriptionEn: descriptionEn?.content ?? "",
          mdxFr: project.mdxFr,
          mdxEn: project.mdxEn,
          makable: project.makable,
          runnerLanguage: project.runnerLanguage ?? "c",
          runnerGithubBranch: project.runnerGithubBranch ?? "main",
          runnerGithubFiles: project.runnerGithubFiles.join(", "),
          runnerSampleStdin: project.runnerSampleStdin ?? "",
        }}
      />
      <div className="mt-6">
        <Button variant="outline" asChild>
          <Link href="/admin/projects">Retour à la liste</Link>
        </Button>
      </div>
    </div>
  );
}
