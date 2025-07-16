import { css, type Theme } from '@emotion/react';

export const wrapper = (theme: Theme) => css`
  position: relative;
  background-color: ${theme.colors.prePrimary};
  border: none;
  color: ${theme.colors.secondary};
`;
