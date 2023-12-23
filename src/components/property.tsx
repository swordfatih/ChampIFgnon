import { useEffect, useRef, useState, type ReactNode } from "react";

import { generatePastelColor } from "@/lib/color";

type PropertyProps = {
  title: string;
  data?: string | number;
  render?: (item: string | number) => ReactNode;
};

export function Property({
  title,
  data,
  render = (item: string | number) => <div>{item}</div>,
}: PropertyProps) {
  const [width, setWidth] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWidth(titleRef?.current?.getBoundingClientRect().width ?? 0);
  }, []);

  if (!data) {
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
      {render(data)}
    </div>
  );
}
