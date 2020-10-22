import React, { useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { MdKeyboardTab } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';

import api from '../../service/api';

import { isAuthenticated } from '../../helpers/authenticate';

import { validateCpf } from '../../utils/validations';
import { MaskCpf } from '../../utils/masks';

import { Container } from './styles';

export default function Login(props) {
  const history = useHistory();

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [isValidCpf, setIsValidCpf] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    const user = {
      cpf: cpf.replace(/\D/g, ''),
      password,
    };
    try {
      const response = await api.post('/auth', user);
      const { id, userType } = response.data;
      localStorage.setItem('user', id);
      localStorage.setItem('userType', userType);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  function validateForm() {
    let isFormValid = true;
    if (!validateCpf(cpf)) {
      setMessageError('CPF inválido');
      isFormValid = false;
      setIsValidCpf(false);
    }
    if (password.length < 6) {
      setMessageError('A senha não pode ser inferior a 6 caracteres');
      setIsValidPassword(false);
      isFormValid = false;
    }

    if (password.length === 0 && cpf.length === 0) {
      setMessageError('Preencha o campo CPF e senha');
      setIsValidCpf(false);
      isFormValid = false;
    }
    return isFormValid;
  }
  return (
    <>
      {!isAuthenticated() ? (
        <Container>
          <form>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: '36px',
                position: 'relative',
              }}
            ></div>
            <div className="form-group">
              <label htmlFor="cpf" className={!isValidCpf ? 'invalid' : ''}>
                CPF
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
            </div>
            <div className="form-group">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <label
                  htmlFor="password"
                  className={!isValidPassword ? 'invalid' : ''}
                >
                  Senha
                </label>
              </div>
              <input
                type="password"
                id="password"
                placeholder="Sua senha"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (event.target.value.length > 0) {
                    setIsValidPassword(true);
                  }
                }}
              />
            </div>
            {!isValidCpf || !isValidPassword ? (
              <span className="invalid form-group">{messageError}</span>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              onClick={(event) => handleSubmit(event)}
              className="button"
            >
              {loading ? <FaSpinner size={30} className="fa-spin" /> : 'Entrar'}
            </button>
          </form>
        </Container>
      ) : (
        <Redirect
          to={{ pathname: '/register', state: { from: props.location } }}
        />
      )}
    </>
  );
}
