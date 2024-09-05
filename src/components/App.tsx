import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from 'sonner';

import { AuthProvider } from './providers/useAuth';

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <AuthProvider>
      <Outlet />
      <Toaster richColors position="top-center" duration={3000} />
    </AuthProvider>
  );
};

export default App;
