import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter } from 'react-router-dom';

import ProtectedLoggedRoute from './ProtectedLoggedRoute';
import ProtectedRoute from './ProtectedRoute';

import App from '@components/App';
import { MainLayout } from '@components/layouts/MainLayout';
import { GlobalError } from '@components/ui/GlobalError';

import ArchiveBooks from '@pages/ArchiveBooks';
import ArchivedBook from '@pages/ArchivedBook';
import CreateBook from '@pages/CreateBook';
import CreateFictionBook from '@pages/CreateFictionBook';
import EachBookPage from '@pages/EachBookPage';
import EachFictionBookPage from '@pages/EachFictionBookPage';
import FictionBooksPage from '@pages/FictionBooksPage';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';

import { PATH } from '@utils/path';

export const router = createBrowserRouter([
  {
    path: PATH.home,
    element: <App />,
    errorElement: <GlobalError />,
    children: [
      {
        path: '',
        element: (
          <ProtectedRoute>
            <MainLayout>
              <ErrorBoundary fallback={<GlobalError />}>
                <HomePage />
              </ErrorBoundary>
            </MainLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: PATH.eachBook,
        element: (
          <ProtectedRoute>
            <MainLayout>
              <ErrorBoundary fallback={<GlobalError />}>
                <EachBookPage />
              </ErrorBoundary>
            </MainLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: PATH.addBook,
        element: (
          <ProtectedRoute>
            <MainLayout>
              <CreateBook />
            </MainLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: PATH.addFiction,
        element: (
          <ProtectedRoute>
            <MainLayout>
              <CreateFictionBook />
            </MainLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: PATH.fiction,
        element: (
          <ProtectedRoute>
            <MainLayout>
              <ErrorBoundary fallback={<GlobalError />}>
                <FictionBooksPage />
              </ErrorBoundary>
            </MainLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: PATH.eachFictionBook,
        element: (
          <ProtectedRoute>
            <MainLayout>
              <ErrorBoundary fallback={<GlobalError />}>
                <EachFictionBookPage />
              </ErrorBoundary>
            </MainLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: PATH.archive,
        element: (
          <ProtectedRoute>
            <MainLayout>
              <ErrorBoundary fallback={<GlobalError />}>
                <ArchiveBooks />
              </ErrorBoundary>
            </MainLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: PATH.archiveBook,
        element: (
          <ProtectedRoute>
            <MainLayout>
              <ErrorBoundary fallback={<GlobalError />}>
                <ArchivedBook />
              </ErrorBoundary>
            </MainLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: PATH.login,
        element: (
          <ProtectedLoggedRoute>
            <LoginPage />
          </ProtectedLoggedRoute>
        ),
      },
    ],
  },
]);
