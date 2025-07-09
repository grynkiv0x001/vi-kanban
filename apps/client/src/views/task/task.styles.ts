import { css, type Theme } from '@emotion/react';

export const task = (theme: Theme) => css`
  margin: 0;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    width: 100%;
    outline: none;
  }

  button {
    background-color: transparent;
    border: none;
    opacity: 0;
    cursor: pointer;

    svg {
      fill: ${theme.colors.danger};
    }
  }

  &:hover button {
    opacity: 1;
  }
`;

export const name = css`
  padding: 0;
  width: 100%;
  text-overflow: ellipsis;
  background-color: transparent;
`;
