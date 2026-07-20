const MINOR_RE = /^\d+$/;
const MAJOR_RE = /^(\d+)(?:\.(\d{1,2}))?$/;
const STORAGE_SCALE = BigInt(100);

function asMinor(value: string): bigint {
  if (!MINOR_RE.test(value)) {
    throw new Error(`Invalid minor-unit value: ${value}`);
  }
  return BigInt(value);
}

export function addMinor(values: readonly string[]): string {
  return values.reduce((sum, value) => sum + asMinor(value), BigInt(0)).toString();
}

export function multiplyMinor(value: string, quantity: number): string {
  if (!Number.isInteger(quantity) || quantity < 0) {
    throw new Error(`Invalid quantity: ${quantity}`);
  }
  return (asMinor(value) * BigInt(quantity)).toString();
}

export function subtractMinorFloor(value: string, subtract: string): string {
  const result = asMinor(value) - asMinor(subtract);
  return (result > BigInt(0) ? result : BigInt(0)).toString();
}

export function compareMinor(a: string, b: string): -1 | 0 | 1 {
  const left = asMinor(a);
  const right = asMinor(b);
  return left < right ? -1 : left > right ? 1 : 0;
}

export function parseUsdMajor(input: string): string | null {
  const match = MAJOR_RE.exec(input.trim());
  if (!match) return null;
  const [, integer, fraction = ''] = match;
  return (BigInt(integer) * STORAGE_SCALE + BigInt(fraction.padEnd(2, '0'))).toString();
}

export type FxRateQuote = {
  base: 'USD';
  quote: 'KHR';
  rateUnits: string;
  rateScale: number;
};

/**
 * Convert universal exponent-2 USD minor units to KHR minor units and round
 * half-up once to a whole-riel tenderable unit.
 */
export function convertUsdMinorToKhr(
  usdMinor: string,
  rate: FxRateQuote,
): string {
  const units = asMinor(rate.rateUnits);
  if (!Number.isInteger(rate.rateScale) || rate.rateScale < 0 || rate.rateScale > 9 || units <= BigInt(0)) {
    throw new Error('Invalid FX rate');
  }

  const rateScale = BigInt(10) ** BigInt(rate.rateScale);
  const denominator = rateScale * STORAGE_SCALE;
  const numerator = asMinor(usdMinor) * units;
  const wholeRiels = (numerator + denominator / BigInt(2)) / denominator;
  return (wholeRiels * STORAGE_SCALE).toString();
}
