import { describe, test, expect } from 'vitest';

import { toKebabCase } from '@/helpers/to-kebap';

describe('to-kebap helper function', () => {
  test('should skip empty string', () => {
    const input = '';

    return expect(toKebabCase(input)).equal('');
  });

  test('should process camelCase', () => {
    const input = 'testStringWithCamelCase';
    const result = 'test-string-with-camel-case';

    return expect(toKebabCase(input)).equal(result);
  });

  test('should process snake_case', () => {
    const input = 'test_string_with_snake_case';
    const result = 'test-string-with-snake-case';

    return expect(toKebabCase(input)).equal(result);
  });

  test('should process mixed', () => {
    const input = 'test-stringWith_MixedCase';
    const result = 'test-string-with-mixed-case';

    return expect(toKebabCase(input)).equal(result);
  });
});
