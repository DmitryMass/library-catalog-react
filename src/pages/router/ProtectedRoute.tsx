import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@components/providers/useAuth';

import { PATH } from '@utils/path';

type TProtectedRouteProps = { children: ReactNode };

const ProtectedRoute: FC<TProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  return isLoggedIn() ? (
    <>{children}</>
  ) : (
    <Navigate to={PATH.login} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
