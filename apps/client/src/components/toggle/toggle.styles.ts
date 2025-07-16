import { css, type Theme } from '@emotion/react';

export const label = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  color: ${theme.colors.secondary};
  cursor: pointer;
  user-select: none;
  position: relative;
`;

export const toggle = (theme: Theme) => css`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;

  &:focus + span {
    box-shadow: 0 0 0 2px hsla(252, 80%, 70%, 0.7);
  }

  &:checked + span {
    background-color: ${theme.colors.tertiary};
  }

  &:checked + span::before {
    transform: translateX(20px);
  }
`;

export const slider = (theme: Theme) => css`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background-color: ${theme.colors.primary};
  transition: background-color 0.2s;

  &::before {
    content: '';
    position: absolute;
    height: 16px;
    width: 16px;
    left: 2px;
    top: 2px;
    background-color: #fff;
    transition: transform 0.2s;
  }
`;
