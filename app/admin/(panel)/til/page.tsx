import { deleteTil, getAdminTils } from "@/actions/admin/til";
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

export default async function AdminTilPage() {
  const tils = await getAdminTils();

  return (
    <div>
      <AdminPageHeader
        title="TIL"
        description="Gérez vos entrées Today I Learned."
        createHref="/admin/til/new"
        createLabel="Nouveau TIL"
      />
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre (FR)</TableHead>
              <TableHead>Langage</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tils.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  Aucun TIL pour le moment.
                </TableCell>
              </TableRow>
            ) : (
              tils.map((til) => {
                const titleFr =
                  til.title.find((item) => item.locale === "fr")?.title ?? "—";

                return (
                  <TableRow key={til.id}>
                    <TableCell className="font-medium">{titleFr}</TableCell>
                    <TableCell>{til.language}</TableCell>
                    <TableCell>{til.tags.join(", ") || "—"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <AdminEditLink href={`/admin/til/${til.id}`} />
                        <AdminDeleteButton
                          action={deleteTil.bind(null, til.id)}
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
