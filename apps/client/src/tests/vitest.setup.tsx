import '@testing-library/jest-dom';
import { beforeAll, vi } from 'vitest';

import { MockedSvg } from '@/mocks/svg-mock';

const svgs = import.meta.glob('@/assets/icons/*.svg');

for (const svgPath in svgs) {
  vi.doMock(svgPath + '?react', () => ({
    default: () => <MockedSvg />,
  }));
}

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: query.includes('dark'),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
});
