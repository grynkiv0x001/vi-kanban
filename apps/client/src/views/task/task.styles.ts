import { css } from '@emotion/react';

export const task = css`
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
      fill: #d3869b;
    }
  }

  &:hover button {
    opacity: 1;
  }
`;

export const name = css`
  width: 100%;
  text-overflow: ellipsis;
  background-color: transparent;
  border: none;
  outline: none;
`;
