import { css, type Theme } from '@emotion/react';

export const wrapper = (theme: Theme) => css`
  background-color: ${theme.colors.prePrimary};
  border: none;
  color: ${theme.colors.secondary};
`;
