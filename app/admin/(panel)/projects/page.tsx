import {
  deleteProject,
  getAdminProjects,
} from "@/actions/admin/projects";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import {
  AdminDeleteButton,
  AdminEditLink,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/admin/admin-table-actions";

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();

  return (
    <div>
      <AdminPageHeader
        title="Projets"
        description="Gérez vos projets portfolio."
        createHref="/admin/projects/new"
        createLabel="Nouveau projet"
      />
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre (FR)</TableHead>
              <TableHead>Lien</TableHead>
              <TableHead>Vues</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  Aucun projet pour le moment.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => {
                const titleFr =
                  project.title.find((item) => item.locale === "fr")?.title ??
                  "—";
                const slug = titleFr;

                return (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{titleFr}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {project.link ?? "—"}
                    </TableCell>
                    <TableCell>{project.views}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <AdminEditLink href={`/admin/projects/${project.id}`} />
                        <AdminDeleteButton
                          action={deleteProject.bind(null, project.id, slug)}
                          itemName={titleFr}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
