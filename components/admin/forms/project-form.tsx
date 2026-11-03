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

type ProjectFormValues = {
  link?: string;
  githubLink?: string;
  images?: string;
  oldSlug?: string;
  makable?: boolean;
  runnerLanguage?: string;
  runnerGithubBranch?: string;
  runnerGithubFiles?: string;
  runnerSampleStdin?: string;
  titleFr?: string;
  titleEn?: string;
  subtitleFr?: string;
  subtitleEn?: string;
  descriptionFr?: string;
  descriptionEn?: string;
  mdxFr?: string;
  mdxEn?: string;
};

export function ProjectForm({
  action,
  defaultValues = {},
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: ProjectFormValues;
}) {
  return (
    <form action={action} className="space-y-6">
      {defaultValues.oldSlug && (
        <input type="hidden" name="oldSlug" value={defaultValues.oldSlug} />
      )}
      <Card>
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="link">Lien du projet</Label>
            <Input id="link" name="link" defaultValue={defaultValues.link} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="githubLink">Liens GitHub (séparés par des virgules)</Label>
            <Input
              id="githubLink"
              name="githubLink"
              defaultValue={defaultValues.githubLink}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="images">Images (URLs séparées par des virgules)</Label>
            <Input
              id="images"
              name="images"
              defaultValue={defaultValues.images}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compilation C/C++ (Make)</CardTitle>
          <CardDescription>
            Active uniquement pour les projets console non graphiques. La
            compilation se lance depuis le navigateur du visiteur via une API
            externe, sans charger ton serveur.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              name="makable"
              defaultChecked={defaultValues.makable}
              className="size-4 rounded border"
            />
            Projet compilable (Make)
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="runnerLanguage">Langage</Label>
              <select
                id="runnerLanguage"
                name="runnerLanguage"
                defaultValue={defaultValues.runnerLanguage ?? "c"}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="c">C</option>
                <option value="cpp">C++</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="runnerGithubBranch">Branche GitHub</Label>
              <Input
                id="runnerGithubBranch"
                name="runnerGithubBranch"
                defaultValue={defaultValues.runnerGithubBranch ?? "main"}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="runnerGithubFiles">
                Fichiers sources (chemins GitHub, séparés par des virgules)
              </Label>
              <Input
                id="runnerGithubFiles"
                name="runnerGithubFiles"
                placeholder="src/main.c, src/utils.c, includes/lib.h"
                defaultValue={defaultValues.runnerGithubFiles}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="runnerSampleStdin">Entrée stdin de démo (optionnel)</Label>
              <Textarea
                id="runnerSampleStdin"
                name="runnerSampleStdin"
                rows={3}
                className="font-mono text-sm"
                defaultValue={defaultValues.runnerSampleStdin}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <ProjectLocaleSection
          locale="Français"
          prefix="Fr"
          defaultValues={defaultValues}
        />
        <ProjectLocaleSection
          locale="English"
          prefix="En"
          defaultValues={defaultValues}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Enregistrer</Button>
      </div>
    </form>
  );
}

function ProjectLocaleSection({
  locale,
  prefix,
  defaultValues,
}: {
  locale: string;
  prefix: "Fr" | "En";
  defaultValues: ProjectFormValues;
}) {
  const titleKey = `title${prefix}` as keyof ProjectFormValues;
  const subtitleKey = `subtitle${prefix}` as keyof ProjectFormValues;
  const descriptionKey = `description${prefix}` as keyof ProjectFormValues;
  const mdxKey = `mdx${prefix}` as keyof ProjectFormValues;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{locale}</CardTitle>
        <CardDescription>
          Le titre FR sert aussi de nom de fichier MDX.
        </CardDescription>
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
          <Label htmlFor={descriptionKey}>Description courte</Label>
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
