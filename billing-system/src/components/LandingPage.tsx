import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { useAuth } from '../providers/AuthProvider'
import { toast } from 'sonner'
import { 
  CreditCard, 
  Users, 
  BarChart3, 
  Shield, 
  Globe, 
  Zap,
  Building2,
  User,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginMode, setLoginMode] = useState<'admin' | 'user' | null>(null)
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    const success = await login(email, password)
    if (success) {
      toast.success('Login successful!')
      if (loginMode === 'admin') {
        navigate('/admin')
      } else {
        navigate('/user')
      }
    } else {
      toast.error('Invalid credentials')
    }
  }

  const demoCredentials = [
    { role: 'Admin', email: 'admin@example.com', password: 'password123' },
    { role: 'User', email: 'john.doe@example.com', password: 'password123' }
  ]

  const features = [
    {
      icon: <CreditCard className="h-8 w-8 text-blue-600" />,
      title: "Multi-Gateway Support",
      description: "Integrate with Stripe, Square, Helcim, BTCPay, Web3, and more"
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "User Management",
      description: "Comprehensive admin and user portals for complete control"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      title: "Advanced Analytics",
      description: "Real-time insights into revenue, subscriptions, and performance"
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Tax Compliance",
      description: "Automated HST (Toronto) and USA tax calculations"
    },
    {
      icon: <Globe className="h-8 w-8 text-indigo-600" />,
      title: "Global Ready",
      description: "Multi-currency support with regional tax compliance"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Real-time Processing",
      description: "Instant payment processing and status updates"
    }
  ]

  if (loginMode) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              {loginMode === 'admin' ? (
                <Building2 className="h-12 w-12 text-blue-600" />
              ) : (
                <User className="h-12 w-12 text-green-600" />
              )}
            </div>
            <CardTitle className="text-2xl">
              {loginMode === 'admin' ? 'Admin Portal' : 'User Portal'}
            </CardTitle>
            <CardDescription>
              Sign in to access your {loginMode} dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium text-slate-700">Demo Credentials:</p>
              {demoCredentials.map((cred) => (
                <div key={cred.role} className="text-xs space-y-1">
                  <p className="font-medium">{cred.role}:</p>
                  <p>Email: {cred.email}</p>
                  <p>Password: {cred.password}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Button 
                onClick={handleLogin} 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setLoginMode(null)}
                className="w-full"
              >
                Back to Portal Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Production Ready • Multi-Gateway • Tax Compliant
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 mb-6">
              Multi-Payment Gateway
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Billing System
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Complete billing solution with admin/user portals, multiple payment gateway integration, 
              and comprehensive tax compliance for HST (Toronto) and USA markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => setLoginMode('admin')}
                className="flex items-center gap-2"
              >
                <Building2 className="h-5 w-5" />
                Admin Portal
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setLoginMode('user')}
                className="flex items-center gap-2"
              >
                <User className="h-5 w-5" />
                User Portal
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Comprehensive Billing Features
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need for modern billing and payment processing in one platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {feature.icon}
                    <h3 className="text-lg font-semibold ml-3">{feature.title}</h3>
                  </div>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Gateways Section */}
      <div className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Supported Payment Gateways
            </h2>
            <p className="text-lg text-slate-600">
              Integrated with leading payment processors worldwide
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {[
              'Stripe', 'Square', 'Helcim', 'BTCPay', 
              'LemonSqueezy', 'RevenueCat', 'WooCommerce', 'Web3'
            ].map((gateway) => (
              <Card key={gateway} className="p-4 text-center hover:shadow-md transition-shadow">
                <CardContent className="p-2">
                  <p className="font-medium text-sm">{gateway}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Tax Compliance Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Tax Compliance Built-In
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Automated tax calculations for multiple jurisdictions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-6 bg-red-600 mr-3 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🇨🇦</span>
                  </div>
                  <h3 className="text-lg font-semibold">Canadian HST Compliance</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Full HST compliance for Toronto operations with registration number 826393555RT0001
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Ontario HST (13%)
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Automated tax reporting
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Provincial compliance
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-6 bg-blue-600 mr-3 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🇺🇸</span>
                  </div>
                  <h3 className="text-lg font-semibold">USA Tax Requirements</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  State-specific sales tax calculations across all US jurisdictions
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    State sales tax rates
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Nexus compliance
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Real-time rate updates
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-slate-300 mb-8">
            Choose your portal to explore the comprehensive billing system
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setLoginMode('admin')}
              className="flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100"
            >
              <Building2 className="h-5 w-5" />
              Access Admin Portal
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setLoginMode('user')}
              className="flex items-center gap-2 border-white text-white hover:bg-white hover:text-slate-900"
            >
              <User className="h-5 w-5" />
              Access User Portal
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
