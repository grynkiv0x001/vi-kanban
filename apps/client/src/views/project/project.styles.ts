import { css } from '@emotion/react';

export const project = css`
  padding: 24px;
  display: flex;
  gap: 16px;
  width: 100%;
  overflow-x: auto;

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const addListBtn = css`
  flex-basis: 300px;
  flex-shrink: 1;
  min-width: fit-content;
  height: fit-content;
  text-align: left;
`;
