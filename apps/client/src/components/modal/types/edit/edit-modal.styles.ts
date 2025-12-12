import { css, type Theme } from '@emotion/react';

export const modal = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  min-height: 0;
`;

export const section = css`
  display: flex;
  gap: 24px;
  min-height: 0;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const main = css`
  flex: 1;
  min-width: 0;
`;

export const details = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 200px;
  max-width: 250px;
  padding: 16px;
  background-color: ${theme.colors.primary};
  border: 2px solid ${theme.colors.secondary};

  @media (max-width: 768px) {
    max-width: 100%;
    min-width: 0;
  }
`;

export const detailsTitle = (theme: Theme) => css`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const footer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const deleteButton = (theme: Theme) => css`
  background-color: ${theme.colors.danger};
  color: white;

  &:hover:not(:disabled) {
    background-color: ${theme.colors.danger};
    opacity: 0.9;
  }
`;
