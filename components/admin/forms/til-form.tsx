import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TilFormValues = {
  date?: string;
  tags?: string;
  linkDoc?: string;
  language?: string;
  code?: string;
  titleFr?: string;
  titleEn?: string;
  additionalInfoFr?: string;
  additionalInfoEn?: string;
};

export function TilForm({
  action,
  defaultValues = {},
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: TilFormValues;
}) {
  return (
    <form action={action} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              defaultValue={defaultValues.date}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Langage</Label>
            <Input
              id="language"
              name="language"
              defaultValue={defaultValues.language ?? "ts"}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
            <Input id="tags" name="tags" defaultValue={defaultValues.tags} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="linkDoc">Lien documentation</Label>
            <Input
              id="linkDoc"
              name="linkDoc"
              defaultValue={defaultValues.linkDoc}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="code">Code</Label>
            <Textarea
              id="code"
              name="code"
              rows={8}
              className="font-mono text-sm"
              defaultValue={defaultValues.code}
              required
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <TilLocaleSection locale="Français" prefix="Fr" defaultValues={defaultValues} />
        <TilLocaleSection locale="English" prefix="En" defaultValues={defaultValues} />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Enregistrer</Button>
      </div>
    </form>
  );
}

function TilLocaleSection({
  locale,
  prefix,
  defaultValues,
}: {
  locale: string;
  prefix: "Fr" | "En";
  defaultValues: TilFormValues;
}) {
  const titleKey = `title${prefix}` as keyof TilFormValues;
  const infoKey = `additionalInfo${prefix}` as keyof TilFormValues;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{locale}</CardTitle>
        <CardDescription>Titre et info complémentaire (MDX)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={titleKey}>Titre</Label>
          <Input
            id={titleKey}
            name={titleKey}
            defaultValue={defaultValues[titleKey] as string}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={infoKey}>Info complémentaire</Label>
          <Textarea
            id={infoKey}
            name={infoKey}
            rows={8}
            className="font-mono text-sm"
            defaultValue={defaultValues[infoKey] as string}
          />
        </div>
      </CardContent>
    </Card>
  );
}
