import {
  deleteBlog,
  getAdminBlogs,
} from "@/actions/admin/blogs";
import { getTitleByLocale } from "@/lib/admin-utils";
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

export default async function AdminBlogsPage() {
  const blogs = await getAdminBlogs();

  return (
    <div>
      <AdminPageHeader
        title="Blogs"
        description="Gérez vos articles de blog."
        createHref="/admin/blogs/new"
        createLabel="Nouvel article"
      />
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre (FR)</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead>Épinglé</TableHead>
              <TableHead>Vues</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Aucun article pour le moment.
                </TableCell>
              </TableRow>
            ) : (
              blogs.map((blog) => {
                const titleFr = getTitleByLocale(blog.title, "fr")?.title ?? "—";
                return (
                  <TableRow key={blog.id}>
                    <TableCell className="font-medium">{titleFr}</TableCell>
                    <TableCell>{blog.location}</TableCell>
                    <TableCell>{blog.pinned ? "Oui" : "Non"}</TableCell>
                    <TableCell>{blog.views}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <AdminEditLink href={`/admin/blogs/${blog.id}`} />
                        <AdminDeleteButton
                          action={deleteBlog.bind(null, blog.id)}
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
