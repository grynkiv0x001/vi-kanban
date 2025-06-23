import { css, type Theme } from '@emotion/react';

export const footer = (theme: Theme) => css`
  padding: 8px;
  margin-block-start: auto;

  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
`;
