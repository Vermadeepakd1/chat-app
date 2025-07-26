import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { RouterProvider } from 'react-router-dom'
import AuthPage from './pages/AuthPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import { createBrowserRouter } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage />,
  },
  {
    path: '/chat',
    element: (
      <PrivateRoute>
        <ChatPage />
      </PrivateRoute>
    ),
  },
  {
    path: '*',
    element: <div>Not Found</div>,
  }

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
