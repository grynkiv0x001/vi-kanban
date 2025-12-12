import { css, type Theme } from '@emotion/react';

export const form = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const detailItem = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const detailLabel = (theme: Theme) => css`
  font-size: 12px;
  color: ${theme.colors.tertiary};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

export const detailValue = (theme: Theme) => css`
  font-size: 13px;
  color: ${theme.colors.secondary};
  word-break: break-word;
`;

export const description = css`
  min-height: 200px;
  max-height: 400px;
  width: 100%;
  max-width: 100%;
  resize: none;
  overflow-y: auto;

  &:is(textarea) {
    height: 400px;
  }
  
  @media (max-width: 768px) {
    min-height: 300px;
  }
  
  @media (max-width: 480px) {
    min-height: 250px;
  }
`;

