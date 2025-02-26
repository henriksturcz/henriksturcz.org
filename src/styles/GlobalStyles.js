import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
  }

  html, body {
    min-height: 100vh; /* 🔥 A teljes képernyő magasságát biztosítja */
    width: 100%;
    overflow-x: hidden; /* 🔥 Megakadályozza a vízszintes görgetést */
  }

  body {
    background: linear-gradient(135deg, #076585, #fff);
    color: white;
    background-repeat: no-repeat; /* 🔥 Nem ismétlődik a háttér */
    background-attachment: fixed; /* 🔥 Fix háttér, hogy ne mozogjon görgetéskor */
  }

  a {
    color: white;
    text-decoration: none;
    transition: 0.3s;

    &:hover {
      color: #f0f0f0;
    }
  }
`;

export default GlobalStyles;
