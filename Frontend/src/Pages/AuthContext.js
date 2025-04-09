import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust import path as needed

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      // Try to get from localStorage/sessionStorage
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      // If parsing fails, clear the corrupted data and return null
      console.error("Error parsing user data from localStorage:", error);
      localStorage.removeItem('user');
      return null;
    }
  });

  // Derive these values from user state
  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'admin'; // Assuming role is stored in user object

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // If we have additional user data (like role) stored elsewhere, 
        // we would fetch it here and combine with firebaseUser data
        
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || '',
          // Use existing role if available or set default
          role: user?.role || 'user', 
          name: firebaseUser.displayName || user?.name || 'User'
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });
    
    return () => unsubscribe();
  }, []);

  const login = (userData) => {
    console.log('Login called with:', userData);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  const logout = () => {
    console.log('Logout called');
    setUser(null);
    localStorage.removeItem('user');
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
