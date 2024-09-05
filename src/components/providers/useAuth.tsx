import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import axios, { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { CustomError, TLoginFormProps } from 'types/types';

import { authToken } from '@utils/localstorage';
import { PATH } from '@utils/path';

type TAuthContextProps = {
  token: string | null;
  mutate: UseMutateFunction<
    AxiosResponse<
      {
        token: string;
      },
      unknown
    >,
    CustomError,
    TLoginFormProps,
    unknown
  >;
  logout: () => void;
  isLoggedIn: () => boolean;
  isPending: boolean;
};

type Props = { children: React.ReactNode };

const AuthContext = createContext<TAuthContextProps>({} as TAuthContextProps);

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(authToken);
    if (token) {
      setToken(token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
    setIsReady(true);
  }, []);

  const loginFormSubmit = async (data: TLoginFormProps) =>
    await axios.post<{ token: string }>(
      `${import.meta.env.VITE_URL}auth/login`,
      data,
      {
        headers: {
          'Content-type': 'application/json',
        },
      },
    );

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TLoginFormProps) => {
      return loginFormSubmit(data);
    },
    onSuccess: (data) => {
      localStorage.setItem(authToken, data.data.token);
      setToken(data.data.token);
      toast.success('Вхід успішно здійснено.');
      navigate(PATH.home);
    },
    onError: (error: CustomError) => {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    },
  });

  const isLoggedIn = () => {
    return !!token;
  };

  const logout = () => {
    localStorage.removeItem(authToken);
    setToken(null);
    navigate(PATH.login);
  };

  return (
    <AuthContext.Provider
      value={{ mutate, isPending, token, logout, isLoggedIn }}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
