import '@testing-library/jest-dom';
import { vi } from 'vitest';

import { MockedSvg } from '@/mocks/svg-mock';

const svgs = import.meta.glob('@/assets/icons/*.svg');

for (const svgPath in svgs) {
  vi.doMock(svgPath + '?react', () => ({
    default: () => <MockedSvg />,
  }));
}
