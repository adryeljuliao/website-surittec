import React, { useState, useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import { Container } from './styles';

export default function Header(props) {
  // console.log(props.isGoBack)
  const history = useHistory();

  return (
    <Container>
      <div className="header">
        <div className="w-50 d-flex justify-content-around m-auto">
          <Link to="/register" className="link m-0 link-account">
            <span>
              <strong>Cadastrar</strong>
            </span>
          </Link>
          <Link to="/users/all" className="link m-0 link-account">
            <span>
              <strong>Visualizar</strong>
            </span>
          </Link>
          <Link to="/profile" className="link m-0 link-account">
            <span>
              <strong>Perfil</strong>
            </span>
          </Link>
        </div>
      </div>
    </Container>
  );
}
