import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductosPage from './pages/ProductosPage';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './context/AuthProvider';
import LogoutPage from './pages/LogoutPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/productos"
            element={
              <PrivateRoute>
                <ProductosPage />
              </PrivateRoute>
            }
          />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
