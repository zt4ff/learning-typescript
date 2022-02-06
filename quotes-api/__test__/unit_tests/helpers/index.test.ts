import { isEmpty, isValidEmailAddress } from '../../../src/helpers/index';

describe('helpers functions', () => {
  test('if string is empty or not', () => {
    expect(isEmpty('')).toBeTruthy();
    expect(isEmpty('hello world')).toBeFalsy();
  });

  test('if email is valid', () => {
    const e1 = 'abc@xyz.com';
    const e2 = 'abc.cd@xyz.co.xy';
    const e3 = '@gg.com';
    expect(isValidEmailAddress(e1)).toBeTruthy();
    expect(isValidEmailAddress(e2)).toBeTruthy();
    expect(isValidEmailAddress(e3)).toBeFalsy();
  });
});
