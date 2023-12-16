import Select, { type CSSObjectWithLabel } from "react-select";

import type { SearchItem } from "@/types/search";

type AdvancedSearchProps = {
  data?: SearchItem[];
  onSelect: (choice: SearchItem | null) => void;
  placeholder: string;
  value?: string;
  z?: number;
};

export function AdvancedSearch({
  data,
  onSelect,
  placeholder,
  value,
  z,
}: AdvancedSearchProps) {
  return (
    <div
      style={{
        zIndex: z ?? 0,
      }}
      className="relative mx-auto flex w-1/2 max-w-xs rounded-xl border border-zinc-700 p-1 text-zinc-200 shadow-md duration-300 hover:shadow-black sm:max-w-full"
    >
      <Select
        className="z-10 grow font-mono text-zinc-200"
        options={
          data?.map(({ value, label }) => ({
            value,
            label,
          })) || []
        }
        value={data?.find((item) => item.value === value)}
        onChange={onSelect}
        placeholder={placeholder}
        isClearable={true}
        styles={{
          singleValue: (provided) =>
            ({
              ...provided,
              color: "white",
            }) as CSSObjectWithLabel,
          control: (baseStyles: CSSObjectWithLabel) =>
            ({
              ...baseStyles,
              borderWidth: 0,
              backgroundColor: "transparent",
              color: "white",
            }) as CSSObjectWithLabel,
          menu: (baseStyles: CSSObjectWithLabel) =>
            ({
              ...baseStyles,
              borderWidth: 1,
              borderColor: "#555555",
              backgroundColor: "black",
            }) as CSSObjectWithLabel,
          option: (base) =>
            ({
              ...base,
              ":hover": {
                color: "#555555",
              },
            }) as CSSObjectWithLabel,
          menuList: (base) =>
            ({
              ...base,
              "::-webkit-scrollbar": {
                width: "4px",
                height: "0px",
              },
              "::-webkit-scrollbar-track": {
                background: "#black",
              },
              "::-webkit-scrollbar-thumb": {
                background: "#888",
              },
              "::-webkit-scrollbar-thumb:hover": {
                background: "#555",
              },
            }) as CSSObjectWithLabel,
        }}
      />
    </div>
  );
}

export default AdvancedSearch;
