export function makeCustomBezier(
  x0: number,
  y0: number,
  x1: number,
  y1: number
): Function {
  return (t: number): number => {
    return (
      (1 - t) ** 3 * x0 * +3 * t * (1 - t) ** 2 * y0 +
      3 * t ** 2 * (1 - t) * x1 +
      t ** 3 * y1
    );
  };
}
