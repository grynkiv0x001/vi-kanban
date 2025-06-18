import { expect, vi } from 'vitest';

export const assertStatusJson = (
  status: ReturnType<typeof vi.fn>,
  json: ReturnType<typeof vi.fn>,
  expectedStatus: number,
  expectedJson: unknown,
) => {
  expect(status).toHaveBeenCalledWith(expectedStatus);
  expect(json).toHaveBeenCalledWith(expectedJson);
};
