import styled from 'styled-components';

export const ContainerWrapper = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .section-title {
    font-weight: bold;
    font-size: 22px;
    color: #555;
  }
  .alert {
    border-radius: 8px;
    padding: 10px 16px;
    margin-bottom: 18px;
    &.alert-success {
      background-color: #ceffe5;
      border: 1px solid #57b76a;
    }
    &.alert-wrong {
      background-color: #ffcece;
      border: 1px solid #b75757;
    }
  }
  @media (max-width: 991.98px) {
    height: 100%;
  }
`;

export const Content = styled.div`
  width: 100%;
  padding: 36px;
  background: #f5f5f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: column;
`;
