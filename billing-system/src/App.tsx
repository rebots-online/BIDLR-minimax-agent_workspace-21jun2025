import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ThemeProvider } from 'next-themes'
import AdminPortal from './components/admin/AdminPortal'
import UserPortal from './components/user/UserPortal'
import LandingPage from './components/LandingPage'
import AuthProvider from './providers/AuthProvider'
import './App.css'

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/admin/*" element={<AdminPortal />} />
              <Route path="/user/*" element={<UserPortal />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster position="top-right" richColors />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
