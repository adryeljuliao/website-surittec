import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  form {
    flex: 1;
    padding: 36px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;

    .button {
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    a {
    }
  }
`;
