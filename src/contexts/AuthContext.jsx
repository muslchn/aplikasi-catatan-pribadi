import React from 'react';
import PropTypes from 'prop-types';
import {
  getAccessToken,
  getUserLogged,
  putAccessToken,
} from '../utils/network-data';

const AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  const [authUser, setAuthUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);

  React.useEffect(() => {
    async function loadUser() {
      if (!getAccessToken()) {
        setInitializing(false);
        return;
      }

      const { error, data } = await getUserLogged();

      if (!error) {
        setAuthUser(data);
      } else {
        localStorage.removeItem('accessToken');
      }

      setInitializing(false);
    }

    loadUser();
  }, []);

  const onLoginSuccess = async (accessToken) => {
    putAccessToken(accessToken);
    const { error, data } = await getUserLogged();

    if (!error) {
      setAuthUser(data);
    } else {
      localStorage.removeItem('accessToken');
    }

    return { error };
  };

  const onLogout = () => {
    localStorage.removeItem('accessToken');
    setAuthUser(null);
  };

  const value = React.useMemo(() => ({
    authUser,
    initializing,
    onLoginSuccess,
    onLogout,
  }), [authUser, initializing]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
