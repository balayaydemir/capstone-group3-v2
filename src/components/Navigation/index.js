import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import './Navigation.css';


const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser 
          ? <NavigationAuth username={authUser.username} role={authUser.role} org={authUser.org} /> 
          : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);


const NavigationAuth = ({ username, role, org }) => (
  <nav className="app__header">
    <h1>
      <Link to={ROUTES.LANDING}>
        <img src="" alt="app__logo" />
      </Link>
    </h1>
    <ul className="header__logout">
      <li className="user__info">
        <span>Welcome, {username}!</span>
        <span>Role: {role}</span>
        <span>Organization: {org}</span>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Dashboard</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  </nav>
);


const NavigationNonAuth = () => (
  <nav className="app__header">
    <h1>
      <Link to={ROUTES.LANDING}>
        <img src="" alt="app__logo" />
      </Link>
    </h1>
    <ul className="header__login">
      <li>
        <Link to={ROUTES.SIGN_UP}>Register</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;