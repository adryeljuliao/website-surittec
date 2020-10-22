import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
 
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    font: 400 14px Roboto, sans-serif;
    background: #f9f9f9;
    --webkit-font-smoothing: antialiased;
  }

  input, button, textarea {
    font: 400 18px Roboto, sans-serif;
  }
 
  button {
    cursor: pointer;
  }

  .invalid {
    color: #e20000 !important;
    font-size: 12px;
    font-weight: bold;
  }
  .fa-spin {
    animation: fa-spin 2s infinite linear;
    margin: 8px;
  }
  @keyframes fa-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }

  form {
    
    input, textarea, select {
      width: 100%;
      color: #333;
      border: 1px solid #d7d7d7;
      border-radius: 4px;
      font-size: 14px;
      ::placeholder {
        color: #ccc;
      }
    }

    input, select {
      height: 50px;
      text-overflow: ellipsis;
    }

    textarea {
      min-height: 140px;
      padding: 16px 24px;
      line-height: 24px;
      resize: vertical;
    }
  }
  .form-group {
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    label {
      margin-bottom: 8px;
      font-size: 16px;
      color: #555;
    }
    
    input {
      padding: 24px;
      transition: all 0.4s ease;
      :focus {
        border: 1px solid rgba(0, 0, 0, 0.3);
      }
    }
  }
  .container {
    max-width: 1366px;
    width: 100%;
    margin: auto;
    padding-top: 80px;
  }
  
  .button {
    width: 100%;
    height: 50px;
    background: #3bbbb6;
    border: 0;
    border-radius: 8px;
    color: #ffffff;
    font-weight: normal;
    display: inline-block;
    text-decoration: none;
    text-align: center;
    font-size: 16px;
    transition: filter 0.2s;
    :disabled {
      background: #a9e0de;
      cursor: initial;
      :hover {
        filter: none;
      }
    }
    :hover {
      filter: brightness(90%);
    }
  } 
  .link {
      display: flex;
      align-items: center;
      margin-top: 40px;
      color: #555;
      font-size: 18px;
      text-decoration: none;
      font-weight: 500;
      transition: opacity 0.2s;

      svg {
        margin-right: 8px;
      }
      :hover {
        opacity: 0.8;
      }
  }

  @media (max-width: 767.92px) {
    
    .container {
      padding: 18px;
      padding-top: 60px;
    }
    .form-group label, .button {
      font-size: 16px;
    }
    
    form input, form select, .button {
      height: 45px;
    }
  }
`;
