import type { Property } from "@/types/object";
import PropertyLink from "@/components/propertyLink";

type SearchLinkProps = {
  item: Property;
  type: string;
};

export function SearchLink({ type, item: { name, item } }: SearchLinkProps) {
  return (
    <PropertyLink
      value={name}
      link={`/?${type}=${item.split("/").slice(-1)[0]}#results`}
    />
  );
}
