import { css } from '@emotion/react';

import { MapleMonoHeavy, MapleMonoMedium, MapleMonoRegular } from '@/assets/fonts';

export const global = css`
  @font-face {
    font-family: 'MapleMono';
    font-weight: 400;
    font-display: swap;
    src: url('${MapleMonoRegular}') format('woff2');
  }
  
  @font-face {
    font-family: 'MapleMono';
    font-weight: 500;
    font-display: swap;
    src: url('${MapleMonoMedium}') format('woff2');
  }
  
  @font-face {
    font-family: 'MapleMono';
    font-weight: 700;
    font-display: swap;
    src: url('${MapleMonoHeavy}') format('woff2');
  }
  
  html {
    box-sizing: border-box;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }

  * {
    font-family: 'MapleMono', Helvetica, Arial, sans-serif;
  }

  html, body, #root {
    height: 100%;
    margin: 0;
  }
  
  a {
    text-decoration: none;
  }
`;

export const wrapper = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f9fa;
  
  & > section {
    overflow: auto;
    height: 100%;
    padding: 16px;
  }
`;
