import { css } from '@emotion/react';

export const projects = css`
  display: flex;
  gap: 32px;
`;

export const project = css`
  padding: 32px;
  display: flex;
  flex-basis: 300px;
  border: 1px solid #0B0500;
  color: #0B0500;
  
  &:hover {
    color: #d3869b;
    border-color: #d3869b;
  }
`;
