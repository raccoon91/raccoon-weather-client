import { createGlobalStyle } from "styled-components";

/*
  reset css
  http://meyerweb.com/eric/tools/css/reset/ 
  v2.0 | 20110126
  License: none (public domain)
  
  box-sizing
  https://css-tricks.com/box-sizing/
*/

export const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after, q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }
  *, *:before, *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }

  
  *::-webkit-scrollbar {
    width: 0.8rem;
    height: 0.8rem;
  }
  *::-webkit-scrollbar-thumb {
    border-radius: 0.4rem;
    background-color: white;
  }
  *::-webkit-scrollbar-track {
    background-color: #d9ebff;
    border-radius: 0.4rem;
  }

  @media (min-width: 1025px) { 
    html {
      font-size: 10px;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    html {
      font-size: 9px;
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    html {
      font-size: 8px;
    }
  }

  @media (max-width: 480px) {
    html {
      font-size: 6px;
    }
  }
`;
