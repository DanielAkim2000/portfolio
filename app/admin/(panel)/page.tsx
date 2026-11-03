import prisma from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Eye, FolderKanban, Lightbulb } from "lucide-react";

export default async function AdminDashboardPage() {
  const [blogsCount, projectsCount, tilCount, totalViews] = await Promise.all([
    prisma.blog.count(),
    prisma.project.count(),
    prisma.til.count(),
    prisma.blog
      .aggregate({ _sum: { views: true } })
      .then((r) => r._sum.views ?? 0)
      .then(async (blogViews) => {
        const projectViews = await prisma.project.aggregate({
          _sum: { views: true },
        });
        return blogViews + (projectViews._sum.views ?? 0);
      }),
  ]);

  const stats = [
    {
      label: "Articles de blog",
      value: blogsCount,
      icon: BookOpen,
      description: "Articles publiés",
    },
    {
      label: "Projets",
      value: projectsCount,
      icon: FolderKanban,
      description: "Projets portfolio",
    },
    {
      label: "TIL",
      value: tilCount,
      icon: Lightbulb,
      description: "Today I Learned",
    },
    {
      label: "Vues totales",
      value: totalViews,
      icon: Eye,
      description: "Blogs + projets",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Vue d&apos;ensemble de votre contenu.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, description }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{value}</div>
              <CardDescription>{description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
