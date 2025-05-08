import { Link } from "@/i18n/navigation";

export type HeaderLinkProps = {
  text: string;
  href?: string;
};

export const HeaderLink = (props: HeaderLinkProps) => {
  return (
    <Link href={props.href ?? "/"}>
      <span className="text-primary text-sm font-semibold">{props.text}</span>
    </Link>
  );
};
