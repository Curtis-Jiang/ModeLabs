import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('user'); // 默认角色为普通用户

  // 定义管理员的 email 列表
  const adminEmails = ['admin1@example.com', 'liu-mq22@mails.tsinghua.edu.cn'];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 判断用户 email 是否在管理员列表中
        if (adminEmails.includes(user.email)) {
          setRole('admin');
        } else {
          setRole('user');
        }
        setUser({ uid: user.uid, email: user.email }); // 存储用户 UID 和 email
      } else {
        setRole('user');
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    role
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}