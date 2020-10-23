import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FaTimes, FaPen } from 'react-icons/fa';
import { Container, Row, Col, Table } from 'react-bootstrap';

import api from '../../service/api';
import { MaskCpf } from '../../utils/masks';

import Header from '../../components/Header';

function Profile() {
  const [listUsers, setListUsers] = useState([]);

  const history = useHistory();

  useEffect(() => {
    async function getUsers() {
      const usersResponse = await api.get('/users/all');
      setListUsers(usersResponse.data);
    }
    getUsers();
  }, []);

  function handleEditData(user) {
    const listEmails = user.listEmail.map((email) => {
      return {
        email,
      };
    });
    const listPhones = user.listPhone.map((phone) => {
      return {
        typeCode: getCodePhoneEnum(phone.phoneType),
        phone: phone.phone,
      };
    });

    const userEdit = {
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      cep: user.address.cep,
      place: user.address.place,
      district: user.address.district,
      city: user.address.city,
      uf: user.address.uf,
      complement: user.address.complement,
      listPhones,
      listEmails,
    };
    history.push({
      pathname: '/register',
      userEdit,
    });
  }

  function getCodePhoneEnum(type) {
    switch (type) {
      case 'RESIDENTIAL':
        return 0;
      case 'COMMERCIAL':
        return 1;
      case 'PHONE':
        return 2;
      default:
        return;
    }
  }

  async function handleRemoveUser(id) {
    try {
      await api.delete(`/users/${id}`);
      const usersResponse = await api.get('/users/all');
      setListUsers(usersResponse.data);
    } catch (error) {}
  }
  return (
    <>
      <Header />
      <Container>
        <Row className="mt-4">
          <Col>
            <Table className="pt-3" striped bordered size="sm">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {listUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{MaskCpf(user.cpf)}</td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        <FaTimes
                          style={{ cursor: 'pointer' }}
                          color="#e20"
                          size={18}
                          onClick={() => handleRemoveUser(user.id)}
                          className="mr-4"
                        />
                        <FaPen
                          style={{ cursor: 'pointer' }}
                          size={14}
                          onClick={() => handleEditData(user)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
