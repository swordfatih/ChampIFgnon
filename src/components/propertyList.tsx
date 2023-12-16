import { useEffect, useRef, useState, type ReactNode } from "react";

type Base = {
  item: string;
  name: string;
};

type PropertyListProps<T extends Base> = {
  title: string;
  data?: T[];
  render?: (item: T) => ReactNode;
};

function generatePastelColor() {
  const R = Math.floor(Math.random() * 127 + 127);
  const G = Math.floor(Math.random() * 127 + 127);
  const B = Math.floor(Math.random() * 127 + 127);

  const rgb = (R << 16) + (G << 8) + B;
  return `#${rgb.toString(16)}`;
}

export function PropertyList<T extends Base>({
  title,
  data,
  render = (item: T) => <div>{item.name}</div>,
}: PropertyListProps<T>) {
  const [width, setWidth] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWidth(titleRef?.current?.getBoundingClientRect().width ?? 0);
  }, []);

  if (!data || data.length === 0 || !data[0]) {
    return null;
  }

  return (
    <div
      className="relative w-auto rounded p-8 text-center font-mono"
      style={{
        backgroundColor: `${generatePastelColor()}aa`,
        minWidth: width * 1.3,
      }}
    >
      <div
        className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-gray-200 px-2 py-1 text-lg font-medium text-black"
        ref={titleRef}
      >
        {title}
      </div>
      {data.map((item) => (
        <div key={item.item}>{render(item)}</div>
      ))}
    </div>
  );
}
