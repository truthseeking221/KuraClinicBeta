import { describe, expect, it } from 'vitest';

import {
  addMinor,
  compareMinor,
  convertUsdMinorToKhr,
  parseUsdMajor,
  subtractMinorFloor,
} from './money';

describe('front-desk money contract', () => {
  it('parses USD major input into exponent-2 minor units', () => {
    expect(parseUsdMajor('25')).toBe('2500');
    expect(parseUsdMajor('25.5')).toBe('2550');
    expect(parseUsdMajor('25.555')).toBeNull();
  });

  it('uses exact integer arithmetic', () => {
    expect(addMinor(['600', '1200'])).toBe('1800');
    expect(compareMinor('1800', '600')).toBe(1);
    expect(subtractMinorFloor('600', '1800')).toBe('0');
  });

  it('converts with an injected typed FX quote and whole-riel rounding', () => {
    expect(
      convertUsdMinorToKhr('1500', {
        base: 'USD',
        quote: 'KHR',
        rateUnits: '4100',
        rateScale: 0,
      }),
    ).toBe('6150000');
  });
});
