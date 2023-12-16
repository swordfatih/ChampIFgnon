type Props = {
  value: number;
  color?: string;
  size?: number;
};

export function Rating({ value, color, size = 20 }: Props) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: size - 1,
        width: size * 5 + 4 * 6 + 6,
      }}
    >
      <div
        className="bg-main_gold absolute h-full"
        style={{
          backgroundColor: color,
          width: `${value * size + value * 6}px`,
        }}
      />
      <img
        src="/ChampIFgnon/assets/stars_empty.png"
        alt="star"
        className="absolute z-10 object-contain invert"
      />
      <img
        src="/ChampIFgnon/assets/stars_borders.png"
        alt="star"
        className="absolute z-10 object-contain"
      />
    </div>
  );
}

export default Rating;
