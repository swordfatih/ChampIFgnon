import { Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

type PropertyLinkProps = {
  link?: string;
  value?: string;
  additional?: string;
};

export function PropertyLink({ link, value, additional }: PropertyLinkProps) {
  return (
    <Link
      className={cn(
        "flex cursor-pointer items-center justify-center gap-2 hover:brightness-75",
        additional
      )}
      to={link ?? "#"}
      target={link?.startsWith("http") ? "_blank" : "_self"}
    >
      {value}
      {link && <LinkIcon width={16} height={16} color="cyan" />}
    </Link>
  );
}

export default PropertyLink;
