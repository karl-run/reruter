import { injectGlobal } from 'styled-components';
import reset from 'styled-reset';

const AppStyles = () => injectGlobal`
  ${reset}

  html {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-left: 1rem;
  }  

  h1 {
      font-size: 3rem;
  }
`;

export default AppStyles;
