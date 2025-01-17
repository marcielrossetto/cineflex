import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden; /* Remove rolagem horizontal */
}
;`

export default GlobalStyle;
