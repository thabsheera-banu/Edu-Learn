import React, { createContext, useContext, useEffect, useState  } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();
export default AuthContext;

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [teacherId, setTeacherId] = useState('');

  useEffect(() => {
    // Check if the user object exists in cookies
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/user/teacherlogin',
        { email, password }
      );

      const { data } = response;

      const { access_token, refresh_token, teacher_id  } = data;
      Cookies.set('access-token', access_token);
      Cookies.set('refresh-token', refresh_token);
      Cookies.set('teacher_id', teacher_id);

      setTeacherId(teacher_id);
      const userData = { teacherId: teacher_id, access_token, refresh_token };
      setUser(userData);
      setIsAuthenticated(true);

      // Store the user object in cookies
      Cookies.set('user', JSON.stringify(userData));

      return { teacherId: teacher_id };
    } catch (error) {
      throw new Error('Authentication failed');
    }
  };

  const logout = () => {
    Cookies.remove('access-token');
    Cookies.remove('refresh-token');
    Cookies.remove('teacher_id');
    setUser(null)

    // Clear the user object from cookies
    Cookies.remove('user');

    // Set user and isAuthenticated states
    setUser(null);
    setIsAuthenticated(false);
    
  };

  const authContextValue = {
    isAuthenticated,
    user,
    teacherId,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
