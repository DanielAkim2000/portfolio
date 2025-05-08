import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const ChangeLangueDropdown = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.push(pathname, {
      locale: newLocale,
    });
  };

  return (
    <div className="hidden md:block">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="flex items-center gap-2 bg-accent dark:bg-slate-950/90 text-xl p-2"
          >
            {/* <Globe className="text-muted-foreground" width={24} /> */}
            {locale === "fr" ? "🇫🇷" : "🇬🇧"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="font-bold group bg-white/50 dark:bg-slate-900/50"
          style={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <DropdownMenuItem
            onClick={() => handleLanguageChange("fr")}
            className="flex items-center gap-2 dark:hover:bg-slate-800"
            disabled={locale === "fr"}
          >
            🇫🇷 Français
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleLanguageChange("en")}
            className="flex items-center gap-2 dark:hover:bg-slate-800"
            disabled={locale === "en"}
          >
            🇬🇧 English
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChangeLangueDropdown;
