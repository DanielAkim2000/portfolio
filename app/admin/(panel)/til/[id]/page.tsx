import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminTil, updateTil } from "@/actions/admin/til";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { TilForm } from "@/components/admin/forms/til-form";
import { Button } from "@/components/ui/button";

export default async function EditTilPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const til = await getAdminTil(id);

  if (!til) {
    notFound();
  }

  const titleFr = til.title.find((item) => item.locale === "fr");
  const titleEn = til.title.find((item) => item.locale === "en");
  const infoFr = til.additionalInfo.find((item) => item.locale === "fr");
  const infoEn = til.additionalInfo.find((item) => item.locale === "en");

  return (
    <div>
      <AdminPageHeader
        title="Modifier le TIL"
        description={titleFr?.title ?? til.id}
      />
      <TilForm
        action={updateTil.bind(null, id)}
        defaultValues={{
          date: til.date.toISOString().split("T")[0],
          tags: til.tags.join(", "),
          linkDoc: til.linkDoc ?? "",
          language: til.language,
          code: til.code,
          titleFr: titleFr?.title ?? "",
          titleEn: titleEn?.title ?? "",
          additionalInfoFr: infoFr?.content ?? "",
          additionalInfoEn: infoEn?.content ?? "",
        }}
      />
      <div className="mt-6">
        <Button variant="outline" asChild>
          <Link href="/admin/til">Retour à la liste</Link>
        </Button>
      </div>
    </div>
  );
}
