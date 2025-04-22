import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const getUsersFromStorage = () => {
  const storedUsers = localStorage.getItem('users');
  if (storedUsers) {
    try {
      return JSON.parse(storedUsers);
    } catch {
      localStorage.removeItem('users');
      return [];
    }
  }
  return [];
};

const saveUsersToStorage = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log('User loaded from localStorage:', parsedUser);
      } catch {
        localStorage.removeItem('user');
      }
    }
    
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);
        setItems(parsedItems);
        console.log('Items loaded from localStorage:', parsedItems);
      } catch {
        localStorage.removeItem('items');
        setItems([]);
      }
    }
  }, []);

  const login = (email, password) => {
    const users = getUsersFromStorage();
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      localStorage.setItem('user', JSON.stringify(foundUser));
      setUser(foundUser);
      return { success: true };
    } else {
      return { success: false, message: 'Incorrect email or password' };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const addItem = (item) => {
    const updatedItems = [...items, item];
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const updateItem = (id, newItem) => {
    const updatedItems = items.map(item => item.id === id ? { ...item, ...newItem } : item);
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem('user', JSON.stringify(newUserData));
    const users = getUsersFromStorage();
    const updatedUsers = users.map(u => u.email === newUserData.email ? { ...u, ...newUserData } : u);
    saveUsersToStorage(updatedUsers);
  };

  const addUser = (newUser) => {
    const users = getUsersFromStorage();
    const existingUser = users.find(u => u.email === newUser.email);
    if (existingUser) {
      return { success: false, message: 'Email already registered' };
    }
    users.push(newUser);
    saveUsersToStorage(users);
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, items, addItem, deleteItem, updateItem, updateUser, addUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);