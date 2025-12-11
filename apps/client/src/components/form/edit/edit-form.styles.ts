import { css } from '@emotion/react';

export const form = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const description = css`
  min-height: 400px;
  width: 100%;
  max-width: 100%;
  resize: none;
  
  @media (max-width: 768px) {
    min-height: 300px;
  }
  
  @media (max-width: 480px) {
    min-height: 250px;
  }
`;

