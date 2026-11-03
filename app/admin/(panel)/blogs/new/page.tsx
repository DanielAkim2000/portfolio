import Link from "next/link";
import { createBlog } from "@/actions/admin/blogs";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { BlogForm } from "@/components/admin/forms/blog-form";
import { Button } from "@/components/ui/button";

export default function NewBlogPage() {
  return (
    <div>
      <AdminPageHeader
        title="Nouvel article"
        description="Créez un nouvel article de blog."
      />
      <BlogForm action={createBlog} />
      <div className="mt-6">
        <Button variant="outline" asChild>
          <Link href="/admin/blogs">Annuler</Link>
        </Button>
      </div>
    </div>
  );
}
