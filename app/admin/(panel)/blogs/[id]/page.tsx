import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminBlog, updateBlog } from "@/actions/admin/blogs";
import { getTitleByLocale } from "@/lib/admin-utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { BlogForm } from "@/components/admin/forms/blog-form";
import { Button } from "@/components/ui/button";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getAdminBlog(id);

  if (!blog) {
    notFound();
  }

  const titleFr = getTitleByLocale(blog.title, "fr");
  const titleEn = getTitleByLocale(blog.title, "en");

  return (
    <div>
      <AdminPageHeader
        title="Modifier l'article"
        description={titleFr?.title ?? blog.id}
      />
      <BlogForm
        action={updateBlog.bind(null, id)}
        defaultValues={{
          location: blog.location,
          pinned: blog.pinned,
          images: blog.images.join(", "),
          titleFr: titleFr?.title ?? "",
          titleEn: titleEn?.title ?? "",
          subtitleFr: titleFr?.subtitle ?? "",
          subtitleEn: titleEn?.subtitle ?? "",
          descriptionFr: titleFr?.description ?? "",
          descriptionEn: titleEn?.description ?? "",
          mdxFr: blog.mdxFr,
          mdxEn: blog.mdxEn,
        }}
      />
      <div className="mt-6">
        <Button variant="outline" asChild>
          <Link href="/admin/blogs">Retour à la liste</Link>
        </Button>
      </div>
    </div>
  );
}
