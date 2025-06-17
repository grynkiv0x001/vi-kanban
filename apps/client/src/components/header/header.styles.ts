import { css } from '@emotion/react';

export const header = css`
  padding: 8px 18px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: center;
  height: 42px;

  background-color: #0B0500;
  color: #FFF7F8;
  
  a {
    color: #FFF7F8;
  }
`;

export const nav = css`
  display: flex;
  align-items: center;
  gap: 18px;
  height: 100%;
`;

export const logo = css`
  svg {
    fill: #d3869b;
  }
`;

export const actions = css`
  display: flex;
  gap: 8px;
  justify-self: flex-end;
`;

export const projectName = css`
  input {
    background-color: transparent;
    border: none;
    color: #FFF7F8;
    outline: none;
  }
`;

export const searchBar = css`
  background-color: #FFF7F8;
  border: none;
`;
