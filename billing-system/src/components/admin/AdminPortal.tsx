import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../../providers/AuthProvider'
import AdminLayout from './AdminLayout'
import AdminDashboard from './AdminDashboard'
import UsersManagement from './UsersManagement'
import SubscriptionsManagement from './SubscriptionsManagement'
import InvoicesManagement from './InvoicesManagement'
import PaymentsTracking from './PaymentsTracking'
import PaymentGateways from './PaymentGateways'
import TaxConfiguration from './TaxConfiguration'
import Reports from './Reports'
import Settings from './Settings'

export default function AdminPortal() {
  const { user } = useAuth()

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/users" element={<UsersManagement />} />
        <Route path="/subscriptions" element={<SubscriptionsManagement />} />
        <Route path="/invoices" element={<InvoicesManagement />} />
        <Route path="/payments" element={<PaymentsTracking />} />
        <Route path="/gateways" element={<PaymentGateways />} />
        <Route path="/tax" element={<TaxConfiguration />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  )
}
