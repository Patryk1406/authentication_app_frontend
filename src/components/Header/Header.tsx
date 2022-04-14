import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  token: string;
  setToken: (arg: string) => void;
}

export function Header({ token, setToken }: Props) {
  function logOut() {
    setToken('');
  }

  return (
    <header>
      <nav>
        <ul>
          { !token && (
          <>
            <li><NavLink to="/signup">Sign-up</NavLink></li>
            <li><NavLink to="/login">Log in</NavLink></li>
          </>
          ) }
          {token && (
          <>
            <li><button type="button" onClick={logOut}>Log out</button></li>
            <li><NavLink to="/">Admin panel</NavLink></li>
          </>
          )}
        </ul>
      </nav>
    </header>
  );
}
