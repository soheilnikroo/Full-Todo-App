import { useCallback, useState } from 'react';
import { createContext } from 'react';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const AuthProvider: React.FC = ({ children }) => {
  const [cookies, setCookies, removeCookie] = useCookies(['access_token']);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!cookies.access_token
  );

  const login = useCallback(() => {
    setIsAuthenticated(true);
  }, [cookies.access_token]);

  const logout = useCallback(() => {
    removeCookie('access_token', { path: '/' });
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
