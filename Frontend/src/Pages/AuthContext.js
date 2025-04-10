import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { getUserByUid } from '../services/api';

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
  const [loading, setLoading] = useState(true);

  // Derive these values from user state
  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Try to fetch additional user info from our backend
          const backendUser = await getUserByUid(firebaseUser.uid).catch(() => null);
          
          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || '',
            // Use backend data if available, or existing/default values
            role: backendUser?.role || user?.role || 'user',
            name: backendUser?.displayName || firebaseUser.displayName || user?.name || 'User',
            walletBalance: backendUser?.walletBalance || user?.walletBalance || 0,
          };
          
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Fall back to just Firebase data
          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || '',
            role: user?.role || 'user',
            name: firebaseUser.displayName || user?.name || 'User'
          };
          
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      setLoading(false);
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
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
