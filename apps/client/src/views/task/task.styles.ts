import { css } from '@emotion/react';

export const task = css`
  margin: 0;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

export const name = css`
  padding: 0;
  width: 100%;
  text-overflow: ellipsis;
  background-color: transparent;
`;

export const nameDisplay = css`
  width: 100%;
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
