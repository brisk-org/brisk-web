import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { redirectLink } from '../constants/redirectLinks';
import {
  LoginMutation,
  Occupation,
  RegisterMutation
} from '../generated/graphql';

// export type Occupation =
//   | 'ADMIN'
//   | Occupation.Doctor
//   | 'RECEPTION'
//   | 'LABORATORIAN'
//   | 'NURSE';
interface State {
  username: string;
  password: string;
  occupation: Occupation;
}
type Action =
  | {
      type: 'login' | 'reload' | 'register';
      payload: {
        username: string;
        occupation: Occupation;
      };
    }
  | { type: 'success' | 'error' | 'logout' }
  | { type: 'field'; name: string; value: string };

type ContextT = {
  username: string;
  password: string;
  occupation: Occupation;
  formField: (name: string, value: string) => void;
  login: (data: LoginMutation) => void;
  register: (data: RegisterMutation) => void;
  logout: () => void;
};

const initialState: State = {
  username: '',
  password: '',
  occupation: Occupation.Admin
};

const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'reload':
      return {
        ...state,
        ...action.payload
      };
    case 'login':
      return {
        ...state,
        ...action.payload
      };
    case 'logout':
      Cookies.remove('jwt-access');
      return { ...state };
    case 'field':
      return { ...state, [action.name]: action.value };
    default:
      return state;
  }
};
const AuthContext = createContext<ContextT>({
  username: '',
  password: '',
  occupation: Occupation.Admin,
  formField: () => {},
  login: (data: any) => {},
  register: (data: any) => {},
  logout: () => {}
});

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const history = useHistory();

  useEffect(() => {
    const token = Cookies.get('jwt-access');
    if (token) {
      const { username, occupation }: any = jwtDecode(token);
      dispatch({
        type: 'reload',
        payload: {
          username,
          occupation
        }
      });
      // eslint-disable-next-line no-restricted-globals
      // location.pathname === '/' && history.push(redirectLink(occupation));
      return;
    }
    // history.push('/login');
  }, []);

  const register = function(data: RegisterMutation) {
    if (!data.register.user) {
      return;
    }
    const token = data.register.token;
    token && Cookies.set('jwt-access', token);
    const { username, occupation } = data.register.user;
    dispatch({
      type: 'register',
      payload: {
        username,
        occupation: occupation as any
      }
    });
    history.push(redirectLink(occupation as Occupation));
  };
  const login = function(data: LoginMutation) {
    if (!data.login.user) {
      return;
    }
    const token = data.login.token;
    token && Cookies.set('jwt-access', token);
    const { username, occupation } = data.login.user;
    dispatch({
      type: 'login',
      payload: {
        username,
        occupation: occupation as any
      }
    });
    history.push(redirectLink(occupation as Occupation));
  };
  const logout = function() {
    dispatch({ type: 'logout' });
  };
  const formField = function(name: string, value: string) {
    dispatch({ type: 'field', name, value });
  };

  return (
    <AuthContext.Provider
      value={{
        username: state.username,
        password: state.password,
        occupation: state.occupation,
        login,
        register,
        logout,
        formField
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
