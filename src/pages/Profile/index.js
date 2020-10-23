import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import api from '../../service/api';

import { MaskCellPhone, MaskPhone, MaskCep, MaskCpf } from '../../utils/masks';
import Header from '../../components/Header';
import { ContainerWrapper, Content } from './styles';

function Profile() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState('');

  const history = useHistory();

  function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    history.push('/');
  }
  useEffect(() => {
    async function getDataProfile() {
      if (localStorage.getItem('userType').toUpperCase() === 'ADMIN') {
        setIsAdmin(true);
      }

      try {
        const userResponse = await api.get(
          `/users/${localStorage.getItem('user')}`
        );
        setUser(userResponse.data);
      } catch (error) {}
    }
    getDataProfile();
  }, []);

  function enumToDescription(typePhone) {
    switch (typePhone) {
      case 'RESIDENTIAL':
        return 'Residencial';
      case 'COMMERCIAL':
        return 'Comercial';
      case 'PHONE':
        return 'Celular';
      default:
        return;
    }
  }
  return (
    <>
      {isAdmin ? <Header /> : null}
      <ContainerWrapper>
        <Container>
          {user ? (
            <Content>
              <Row className="w-100">
                <Col sm={12} className="border-bottom pb-2 mb-2">
                  <span className="section-title">Dados pessoais</span>
                </Col>
                <Col sm={12} md={6}>
                  <div className="data-info">
                    <div className="d-flex">
                      <label htmlFor="name" className="mr-3">
                        <strong>Nome:</strong>
                      </label>
                      <span>{user.name}</span>
                    </div>
                  </div>
                </Col>
                <Col sm={12} md={6}>
                  <div className="data-info">
                    <div className="d-flex">
                      <label htmlFor="name" className="mr-3">
                        <strong>CPF:</strong>
                      </label>
                      <span>{MaskCpf(user.cpf)}</span>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="w-100 mt-4">
                <Col sm={12} className="border-bottom pb-2 mb-2">
                  <span className="section-title">Endereço</span>
                </Col>
                <Col sm={12} md={6}>
                  <div className="data-info">
                    <div className="d-flex">
                      <label htmlFor="name" className="mr-3">
                        <strong>CEP:</strong>
                      </label>
                      <span>{MaskCep(user.address.cep)}</span>
                    </div>
                  </div>
                </Col>
                <Col sm={12} md={6}>
                  <div className="data-info">
                    <div className="d-flex">
                      <label htmlFor="name" className="mr-3">
                        <strong>Logradouro:</strong>
                      </label>
                      <span>{user.address.place}</span>
                    </div>
                  </div>
                </Col>
                <Col sm={12} md={6}>
                  <div className="data-info">
                    <div className="d-flex">
                      <label htmlFor="name" className="mr-3">
                        <strong>Bairro:</strong>
                      </label>
                      <span>{user.address.district}</span>
                    </div>
                  </div>
                </Col>
                <Col sm={12} md={6}>
                  <div className="data-info">
                    <div className="d-flex">
                      <label htmlFor="name" className="mr-3">
                        <strong>Complemento:</strong>
                      </label>
                      <span>{user.address.complement}</span>
                    </div>
                  </div>
                </Col>
                <Col sm={12} md={6}>
                  <div className="data-info">
                    <div className="d-flex">
                      <label htmlFor="name" className="mr-3">
                        <strong>Cidade - UF:</strong>
                      </label>
                      <span>{`${user.address.city} - ${user.address.uf}`}</span>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="w-100 mt-4">
                <Col sm={12} className="border-bottom pb-2 mb-2">
                  <span className="section-title">Dados para contato</span>
                </Col>
                <Row className="w-75 m-auto">
                  <Col
                    sm={12}
                    className="text-center col-sm-12 p-2 border-bottom"
                  >
                    <span style={{ color: '#555' }}>
                      <strong>Lista de Telefones</strong>
                    </span>
                  </Col>
                  <ul style={{ listStyle: 'none' }} className="p-2 w-100">
                    {user.listPhone.map((phone, index) => (
                      <li className="d-flex" key={index + ''}>
                        <span className="w-50 text-center">
                          {enumToDescription(phone.phoneType)}
                        </span>
                        <span className="w-50 text-center d-flex justify-content-center align-items-center">
                          {parseInt(phone.typeCode) !== 2
                            ? MaskPhone(phone.phone)
                            : MaskCellPhone(phone.phone)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Row>
                <Row className="w-75 m-auto mt-4">
                  <Col
                    sm={12}
                    className="text-center col-sm-12 p-2 mb-3 border-bottom"
                  >
                    <span style={{ color: '#555' }}>
                      <strong>Lista de E-mails</strong>
                    </span>
                  </Col>
                  <ul style={{ listStyle: 'none' }} className="p-2 w-100">
                    {user.listEmail.map((email, index) => (
                      <li className="d-flex" key={index + ''}>
                        <span className="w-100 text-center">{email}</span>
                      </li>
                    ))}
                  </ul>
                </Row>
              </Row>
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  cursor: 'pointer',
                  marginTop: 36,
                }}
                onClick={() => logout()}
              >
                Sair
              </span>
            </Content>
          ) : (
            <span>Carregando</span>
          )}
        </Container>
      </ContainerWrapper>
    </>
  );
}

export default Profile;
