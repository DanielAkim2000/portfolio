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

type BlogFormValues = {
  location?: string;
  pinned?: boolean;
  images?: string;
  titleFr?: string;
  titleEn?: string;
  subtitleFr?: string;
  subtitleEn?: string;
  descriptionFr?: string;
  descriptionEn?: string;
  mdxFr?: string;
  mdxEn?: string;
};

export function BlogForm({
  action,
  defaultValues = {},
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: BlogFormValues;
}) {
  return (
    <form action={action} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="location">Localisation</Label>
            <Input
              id="location"
              name="location"
              defaultValue={defaultValues.location}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="images">Images (URLs séparées par des virgules)</Label>
            <Input
              id="images"
              name="images"
              defaultValue={defaultValues.images}
            />
          </div>
          <div className="flex items-center gap-2 md:col-span-2">
            <input
              id="pinned"
              name="pinned"
              type="checkbox"
              defaultChecked={defaultValues.pinned}
              className="size-4 rounded border"
            />
            <Label htmlFor="pinned">Épingler l&apos;article</Label>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <LocaleSection locale="Français" prefix="Fr" defaultValues={defaultValues} />
        <LocaleSection locale="English" prefix="En" defaultValues={defaultValues} />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Enregistrer</Button>
      </div>
    </form>
  );
}

function LocaleSection({
  locale,
  prefix,
  defaultValues,
}: {
  locale: string;
  prefix: "Fr" | "En";
  defaultValues: BlogFormValues;
}) {
  const titleKey = `title${prefix}` as keyof BlogFormValues;
  const subtitleKey = `subtitle${prefix}` as keyof BlogFormValues;
  const descriptionKey = `description${prefix}` as keyof BlogFormValues;
  const mdxKey = `mdx${prefix}` as keyof BlogFormValues;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{locale}</CardTitle>
        <CardDescription>Métadonnées et contenu MDX</CardDescription>
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
          <Label htmlFor={subtitleKey}>Sous-titre</Label>
          <Input
            id={subtitleKey}
            name={subtitleKey}
            defaultValue={defaultValues[subtitleKey] as string}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={descriptionKey}>Description</Label>
          <Textarea
            id={descriptionKey}
            name={descriptionKey}
            rows={3}
            defaultValue={defaultValues[descriptionKey] as string}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={mdxKey}>Contenu MDX</Label>
          <Textarea
            id={mdxKey}
            name={mdxKey}
            rows={16}
            className="font-mono text-sm"
            defaultValue={defaultValues[mdxKey] as string}
          />
        </div>
      </CardContent>
    </Card>
  );
}
