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
    margin-bottom: 0.5rem;
  }  

  h1 {
      font-size: 3rem;
  }

  h2 {
      font-size: 2.5rem;
  }

  h3 {
      font-size: 2rem;
  }

  h4 {
      font-size: 1.5rem;
  }

  h5 {
      font-size: 1.2rem;
  }
`;

export default AppStyles;
