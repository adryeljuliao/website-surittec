import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { FaSpinner, FaTimes } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import { Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';

import api from '../../service/api';

import Header from '../../components/Header';
import { isAuthenticated } from '../../helpers/authenticate';
import { MaskPhone, MaskCpf, MaskCep, MaskCellPhone } from '../../utils/masks';
import { validateEmail, validateCpf } from '../../utils/validations';

import { ContainerWrap, Content } from './styles';

export default function Register(props) {
  const [userIdEdit, setUserIdEdit] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [place, setPlace] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [complement, setComplement] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneType, setPhoneType] = useState('');
  const [email, setEmail] = useState('');
  const [alertBox, setAlertBox] = useState(false);
  const [listPhones, setListPhones] = useState([]);
  const [listEmails, setListEmails] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidCpf, setIsValidCpf] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidCep, setIsValidCep] = useState(true);
  const [isValidPlace, setIsValidPlace] = useState(true);
  const [isValidDistrict, setIsValidDistrict] = useState(true);
  const [isValidCity, setIsValidCity] = useState(true);
  const [isValidUf, setIsValidUf] = useState(true);
  const [isValidListPhones, setIsValidListPhones] = useState(true);
  const [isValidListEmails, setIsValidListEmails] = useState(true);

  useEffect(() => {
    let { userEdit } = props.location;
    if (userEdit) {
      setIsEdit(true);
      setUserIdEdit(userEdit.id);
      setName(userEdit.name);
      setCpf(MaskCpf(userEdit.cpf));
      setCep(MaskCep(userEdit.cep));
      setPlace(userEdit.place);
      setDistrict(userEdit.district);
      setCity(userEdit.city);
      setUf(userEdit.uf);
      setComplement(userEdit.complement);
      setListPhones(userEdit.listPhones);
      setListEmails(userEdit.listEmails);
    } else {
      clearFields();
    }
  }, [props.location, userIdEdit]);

  function handlePhone(phone) {
    let maskPhone = phoneType === '2' ? MaskCellPhone(phone) : MaskPhone(phone);
    setIsValidPhone(true);
    setIsValidListPhones(true);
    setPhone(maskPhone);
  }

  function handlePhoneBlur() {
    if (phoneType === '2') {
      if (phone.length > 0 && phone.length < 15) {
        setIsValidPhone(false);
      }
    } else {
      if (phone.length > 0 && phone.length < 14) {
        setIsValidPhone(false);
      }
    }
    // if (phone.length > 0 && phone.length < 15) {
    //   setIsValidPhone(false);
    // } else {
    //   if (phone.length > 0 && phone.length < 14) {
    //     setIsValidPhone(false);
    //   } else {
    //     setIsValidPhone(false);
    //   }
    // }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validForm()) {
      return;
    }
    const userRegister = {
      name,
      cpf: cpf.replace(/\D/g, ''),
      cep: cep.replace(/\D/g, ''),
      place,
      district,
      city,
      uf,
      complement,
      listPhones,
      listEmails,
    };
    try {
      let response;
      if (isEdit) {
        response = await api.put(`/users/${userIdEdit}`, userRegister);
      } else {
        response = await api.post('/users', userRegister);
        // if (response.data) {
        clearFields();
        // }
      }
      setAlertBox(true);
    } catch (err) {
      console.log(err);
    } finally {
    }
  }

  function clearFields() {
    setName('');
    setCpf('');
    setCep('');
    setPlace('');
    setDistrict('');
    setCity('');
    setUf('');
    setListPhones([]);
    setListEmails([]);
    setIsEdit(false);
  }

  async function handleBlurCep() {
    if (cep.length < 9) {
      setIsValidCep(false);
    }
    const searchCep = cep.replace(/\D/g, '');
    const address = await axios.get(
      `https://viacep.com.br/ws/${searchCep}/json`
    );
    if (address.data.erro) {
      return setIsValidCep(false);
    }
    const { logradouro, bairro, localidade, uf } = address.data;
    setPlace(logradouro);
    setDistrict(bairro);
    setCity(localidade);
    setUf(uf);
    setIsValidCep(true);
    setIsValidPlace(true);
    setIsValidDistrict(true);
    setIsValidCity(true);
    setIsValidUf(true);
  }

  function validForm() {
    let isFormValid = true;
    if (name.length === 0) {
      setIsValidName(false);
      isFormValid = false;
    } else {
      setIsValidName(true);
    }

    if (!validateCpf(cpf)) {
      setIsValidCpf(false);
      isFormValid = false;
    }

    if (cep.length === 0) {
      setIsValidCep(false);
      isFormValid = false;
    }
    if (place.length === 0) {
      setIsValidPlace(false);
      isFormValid = false;
    }
    if (district.length === 0) {
      setIsValidDistrict(false);
      isFormValid = false;
    }
    if (city.length === 0) {
      setIsValidCity(false);
      isFormValid = false;
    }
    if (uf.length === 0) {
      setIsValidUf(false);
      isFormValid = false;
    }
    if (!listEmails.length) {
      setIsValidEmail(false);
      setIsValidListEmails(false);
      isFormValid = false;
    }
    if (!listPhones.length) {
      setIsValidListPhones(false);
      setIsValidPhone(false);
      isFormValid = false;
    }
    return isFormValid;
  }

  function addPhone(event) {
    event.preventDefault();
    setPhoneType('');
    setPhone('');
    listPhones.push({
      typeCode: phoneType,
      phone: phone.replace(/\D/g, ''),
    });
  }

  function codeTypePhoneToDescription(code) {
    const codeInt = parseInt(code);
    switch (codeInt) {
      case 0:
        return 'Residencial';
      case 1:
        return 'Comercial';
      case 2:
        return 'Celular';
      default:
        return;
    }
  }

  function removePhone(number) {
    const newList = listPhones.filter(
      (phone) => phone.phone.replace(/\D/g, '') !== number
    );
    setListPhones(newList);
  }

  function addEmail(event) {
    event.preventDefault();
    if (email.length >= 0) {
      const submitEmail = validateEmail(email);
      if (submitEmail) {
        setEmail(submitEmail[0]);
        setIsValidEmail(true);
        setEmail('');
        listEmails.push({
          email,
        });
      } else {
        setIsValidEmail(false);
      }
    }
  }

  function handleName(event) {
    if (event.target.value.length > 0) {
      const re = /^[a-z A-Z 0-9\b]+$/;
      if (event.target.value === '' || re.test(event.target.value)) {
        setName(event.target.value);
      }
      setIsValidName(true);
    } else {
      setName('');
      setIsValidName(false);
    }
  }

  function removeEmail(userEmail) {
    const newList = listEmails.filter((email) => email.email !== userEmail);
    setListEmails(newList);
  }
  return (
    <>
      {isAuthenticated() ? (
        <>
          <Header />
          <ContainerWrap>
            <Container className="mt-4">
              <Content>
                <form>
                  {alertBox ? (
                    <Row>
                      <div
                        className={`alert d-flex align-items-center justify-content-between alert-success w-100`}
                      >
                        <span className="alert-message">
                          Salvo com sucesso!
                        </span>
                        <FaTimes
                          color="#e20"
                          size={18}
                          onClick={(event) => {
                            event.preventDefault();
                            setAlertBox(false);
                          }}
                          style={{ cursor: 'pointer' }}
                        />
                      </div>
                    </Row>
                  ) : null}
                  <Row>
                    <Col sm={12} className="border-bottom pb-2 mb-2">
                      <span className="section-title">Dados pessoais</span>
                    </Col>
                    <Col sm={12} md={6}>
                      <div className="form-group">
                        <label
                          htmlFor="name"
                          className={!isValidName ? 'invalid' : ''}
                        >
                          Nome *
                        </label>
                        <input
                          type="text"
                          id="name"
                          placeholder="Nome completo"
                          value={name}
                          onChange={(event) => handleName(event)}
                        />
                        {!isValidName ? (
                          <span className="invalid">
                            <small>Por favor, informe seu nome</small>
                          </span>
                        ) : null}
                      </div>
                    </Col>
                    <Col sm={12} md={6}>
                      <div className="form-group">
                        <label
                          htmlFor="cpf"
                          className={!isValidCpf ? 'invalid' : ''}
                        >
                          CPF *
                        </label>
                        <input
                          type="cpf"
                          id="cpf"
                          placeholder="Seu CPF"
                          value={cpf}
                          onChange={(event) => {
                            let maskCpf = MaskCpf(event.target.value);
                            setCpf(maskCpf);
                            if (maskCpf.length > 0) {
                              setIsValidCpf(true);
                            }
                          }}
                        />
                        {!isValidCpf ? (
                          <span className="invalid">
                            <small>Por favor, informe um CPF válido</small>
                          </span>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} className="border-bottom pb-2 mb-2">
                      <span className="section-title">Endereço</span>
                    </Col>
                    <Col sm={12} md={6}>
                      <div className="form-group">
                        <label
                          htmlFor="cep"
                          className={!isValidCep ? 'invalid' : ''}
                        >
                          CEP *
                        </label>
                        <input
                          type="cep"
                          id="cep"
                          placeholder="CEP"
                          value={cep}
                          onChange={(event) => {
                            let maskCep = MaskCep(event.target.value);
                            setCep(maskCep);
                            if (maskCep.length > 0) {
                              setIsValidCep(true);
                            }
                          }}
                          onBlur={() => handleBlurCep()}
                        />
                        {!isValidCep ? (
                          <span className="invalid">
                            <small>CEP inválido</small>
                          </span>
                        ) : null}
                      </div>
                    </Col>
                    <Col sm={12} md={6}>
                      <div className="form-group">
                        <label
                          htmlFor="place"
                          className={!isValidPlace ? 'invalid' : ''}
                        >
                          Logradouro *
                        </label>
                        <input
                          type="place"
                          id="place"
                          placeholder="Logradouro"
                          value={place}
                          onChange={(event) => {
                            setPlace(event.target.value);
                            if (event.target.value.length > 0) {
                              setIsValidPlace(true);
                            }
                          }}
                        />
                        {!isValidPlace ? (
                          <span className="invalid">
                            <small>Por favor, informe o logradouro</small>
                          </span>
                        ) : null}
                      </div>
                    </Col>
                    <Col sm={12} md={6}>
                      <div className="form-group">
                        <label
                          htmlFor="district"
                          className={!isValidDistrict ? 'invalid' : ''}
                        >
                          Bairro *
                        </label>
                        <input
                          type="district"
                          id="district"
                          placeholder="Bairro"
                          value={district}
                          onChange={(event) => {
                            setDistrict(event.target.value);
                            if (event.target.value.length > 0) {
                              setIsValidDistrict(true);
                            }
                          }}
                        />
                        {!isValidDistrict ? (
                          <span className="invalid">
                            <small>Por favor, informe o bairro</small>
                          </span>
                        ) : null}
                      </div>
                    </Col>
                    <Col sm={12} md={6}>
                      <div className="form-group">
                        <label htmlFor="complement">Complemento</label>
                        <input
                          type="complement"
                          id="complement"
                          placeholder="Complemento"
                          value={complement}
                          onChange={(event) => {
                            setComplement(event.target.value);
                          }}
                        />
                      </div>
                    </Col>
                    <Col sm={12} md={6}>
                      <div className="form-group">
                        <label
                          htmlFor="city"
                          className={!isValidCity ? 'invalid' : ''}
                        >
                          Cidade *
                        </label>
                        <input
                          type="city"
                          id="city"
                          placeholder="Cidade"
                          value={city}
                          onChange={(event) => {
                            setCity(event.target.value);
                            if (event.target.value.length > 0) {
                              setIsValidCity(true);
                            }
                          }}
                        />
                        {!isValidCity ? (
                          <span className="invalid">
                            <small>Por favor, informe a cidade</small>
                          </span>
                        ) : null}
                      </div>
                    </Col>
                    <Col sm={12} md={6}>
                      <div className="form-group">
                        <label
                          htmlFor="uf"
                          className={!isValidUf ? 'invalid' : ''}
                        >
                          UF *
                        </label>
                        <input
                          type="uf"
                          id="uf"
                          placeholder="UF"
                          value={uf}
                          onChange={(event) => {
                            setUf(event.target.value);
                            if (event.target.value.length > 0) {
                              setIsValidUf(true);
                            }
                          }}
                        />
                        {!isValidUf ? (
                          <span className="invalid">
                            <small>Por favor, informe UF</small>
                          </span>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} className="border-bottom pb-2 mb-2">
                      <span className="section-title">Contato</span>
                    </Col>
                    <Col sm={6}>
                      <div className="form-group">
                        <label
                          htmlFor="phone"
                          className={!isValidListPhones ? 'invalid' : ''}
                        >
                          Selecione o tipo de telefone
                        </label>
                        <Form.Control
                          style={{ height: 50 }}
                          value={phoneType}
                          onChange={(e) => {
                            setPhoneType(e.target.value);
                            setPhone('');
                            setIsValidPhone(true);
                          }}
                          as="select"
                          custom
                        >
                          <option
                            value=""
                            disabled={true}
                            hidden={true}
                            label="Selecionar tipo"
                          ></option>
                          <option value="0" label="Residencial"></option>
                          <option value="1" label="Comercial"></option>
                          <option value="2" label="Celular"></option>
                        </Form.Control>
                        {!isValidListPhones ? (
                          <span className="invalid">
                            <small>
                              Por favor, informe um telefone para contato
                            </small>
                          </span>
                        ) : null}
                      </div>
                    </Col>
                    {phoneType ? (
                      <Col sm={4}>
                        <div className="form-group">
                          <label
                            htmlFor="phone"
                            className={!isValidPhone ? 'invalid' : ''}
                          >
                            Número *
                          </label>
                          <input
                            type="text"
                            id="phone"
                            placeholder={
                              phoneType === '2'
                                ? '(99) 99999-9999'
                                : '(99) 9999-9999'
                            }
                            size={2}
                            value={phone}
                            onChange={(event) =>
                              handlePhone(event.target.value)
                            }
                            onBlur={() => handlePhoneBlur()}
                          />
                          {!isValidPhone ? (
                            <span className="invalid">
                              <small>
                                Por favor, informe um telefone válido
                              </small>
                            </span>
                          ) : null}
                        </div>
                      </Col>
                    ) : null}
                    <Col sm={1} className="d-flex">
                      <div className="form-group">
                        <button
                          type="submit"
                          className="button mt-auto"
                          disabled={!phoneType}
                          onClick={(event) => addPhone(event)}
                          style={{ padding: 12 }}
                        >
                          <MdAdd size={30} />
                        </button>
                      </div>
                    </Col>
                    {phoneType ? (
                      <Col sm={1} className="d-flex">
                        <div className="form-group">
                          <span
                            onClick={() => {
                              setPhone('');
                              setPhoneType('');
                            }}
                            className="mt-auto"
                            style={{
                              cursor: 'pointer',
                              fontSize: 14,
                              fontWeight: 'bold',
                            }}
                          >
                            Cancelar
                          </span>
                        </div>
                      </Col>
                    ) : null}
                  </Row>
                  <Row className="w-75 m-auto">
                    <Col
                      sm={12}
                      className="text-center col-sm-12 p-2 border-bottom"
                    >
                      <span>Lista de telefones</span>
                    </Col>
                    <ul style={{ listStyle: 'none' }} className="p-2 w-100">
                      {listPhones.map((phone, index) => (
                        <li className="d-flex" key={index + ''}>
                          <span className="w-50 text-center">
                            {codeTypePhoneToDescription(phone.typeCode)}
                          </span>
                          <span className="w-50 text-center d-flex justify-content-center align-items-center">
                            {parseInt(phone.typeCode) !== 2
                              ? MaskPhone(phone.phone)
                              : MaskCellPhone(phone.phone)}
                            <FaTimes
                              color="#e20"
                              size={18}
                              className="ml-auto"
                              onClick={() => removePhone(phone.phone)}
                              style={{ cursor: 'pointer' }}
                            />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Row>
                  <Row>
                    <Col sm={11}>
                      <div className="form-group">
                        <label
                          htmlFor="email"
                          className={!isValidEmail ? 'invalid' : ''}
                        >
                          E-mail *
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="E-mail"
                          value={email}
                          onChange={(event) => {
                            setEmail(event.target.value);
                            if (event.target.value.length > 0) {
                              setIsValidEmail(true);
                              setIsValidListEmails(true);
                            } else {
                              setIsValidEmail(false);
                            }
                          }}
                        />
                        {!isValidEmail ? (
                          <span className="invalid">
                            <small>
                              {!isValidListEmails
                                ? 'Por favor, pelo menos um e-mail para contato'
                                : 'Por favor, informe um e-mail válido'}
                            </small>
                          </span>
                        ) : null}
                      </div>
                    </Col>
                    <Col sm={1} className="d-flex">
                      <div className="form-group">
                        <button
                          type="submit"
                          className="button mt-auto"
                          onClick={(event) => addEmail(event)}
                          style={{ padding: 12 }}
                        >
                          <MdAdd size={30} />
                        </button>
                      </div>
                    </Col>
                    <Row className="w-75 m-auto">
                      <Col
                        sm={12}
                        className="text-center col-sm-12 p-2 border-bottom"
                      >
                        <span>Lista de e-mails</span>
                      </Col>
                      <ul style={{ listStyle: 'none' }} className="p-2 w-100">
                        {listEmails.map((email, index) => (
                          <li className="d-flex" key={index + ''}>
                            <span className="w-100 text-center d-flex justify-content-center align-items-center">
                              {email.email}
                              <FaTimes
                                color="#e20"
                                size={18}
                                className="ml-auto"
                                onClick={() => removeEmail(email.email)}
                                style={{ cursor: 'pointer' }}
                              />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </Row>
                  </Row>

                  <button
                    type="submit"
                    className="button"
                    disabled={loading}
                    onClick={(event) => handleSubmit(event)}
                  >
                    {loading ? (
                      <FaSpinner size={30} className="fa-spin" />
                    ) : (
                      <>{isEdit ? 'Salvar' : 'Cadastrar'}</>
                    )}
                  </button>
                </form>
              </Content>
            </Container>
          </ContainerWrap>
        </>
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )}
    </>
  );
}
