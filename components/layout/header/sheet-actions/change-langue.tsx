import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useLocale } from "next-intl";

import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";

const ChangeLangue = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.push(pathname, {
      locale: newLocale,
    });
  };

  return (
    <div className="flex items-center gap-2 md:hidden absolute left-4 top-4">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <ToggleGroup
        type="single"
        value={locale}
        onValueChange={(value) => value && handleLanguageChange(value)}
        size="sm"
        variant="outline"
        className="rounded-full"
      >
        <ToggleGroupItem
          value="fr"
          aria-label="Français"
          className="rounded-l-full px-3 py-1.5"
        >
          🇫🇷
        </ToggleGroupItem>
        <ToggleGroupItem
          value="en"
          aria-label="English"
          className="rounded-r-full px-3 py-1.5"
        >
          🇬🇧
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default ChangeLangue;
