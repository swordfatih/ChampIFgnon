import type { Creator } from "@/types/game";
import PropertyLink from "@/components/propertyLink";

type CreatorLinkProps = {
  item: Creator;
};

export function CreatorLink({
  item: { person, item, name },
}: CreatorLinkProps) {
  return (
    <PropertyLink
      link={`/${person ? "person" : "company"}/${item.split("/").slice(-1)}`}
      value={name}
    />
  );
}

export default CreatorLink;
