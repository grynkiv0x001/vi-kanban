import { css, type Theme } from '@emotion/react';

export const wrapper = (theme: Theme) => css`
  position: relative;
  background-color: ${theme.colors.prePrimary};
  border: none;
  color: ${theme.colors.secondary};

  width: 100%;
  max-width: 700px;
  min-width: 320px;
  max-height: 90vh;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    max-width: 95vw;
    max-height: 95vh;
  }
  
  @media (max-width: 480px) {
    max-width: 100vw;
    max-height: 100vh;
  }
`;
