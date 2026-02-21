import { AppRoutes } from './AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </div>
  );
}

export default App;
