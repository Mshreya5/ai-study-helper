"use client";
import { useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useStore } from '@/store/useStore';

function formatUserData(firebaseUser) {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
  };
}

export function AuthProvider({ children }) {
  const { setCurrentUser, setLoading } = useStore();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser(formatUserData(firebaseUser));
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setCurrentUser, setLoading]);

  return children;
}

export function useAuth() {
  const { setCurrentUser, setError } = useStore();

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(formatUserData(userCredential.user));
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setCurrentUser(formatUserData(userCredential.user));
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return { login, signup, logout };
}
