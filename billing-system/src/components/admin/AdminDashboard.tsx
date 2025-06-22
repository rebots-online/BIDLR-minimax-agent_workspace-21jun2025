import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import {
  DollarSign,
  Users,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Activity,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw
} from 'lucide-react'

interface DashboardMetrics {
  totalRevenue: {
    value: number
    currency: string
    changePercent: number
    changeType: string
    period: string
  }
  monthlyRecurringRevenue: {
    value: number
    currency: string
    changePercent: number
    changeType: string
    period: string
  }
  activeSubscriptions: {
    value: number
    changePercent: number
    changeType: string
    period: string
  }
  totalCustomers: {
    value: number
    changePercent: number
    changeType: string
    period: string
  }
  churnRate: {
    value: number
    unit: string
    changePercent: number
    changeType: string
    period: string
  }
  averageRevenuePerUser: {
    value: number
    currency: string
    changePercent: number
    changeType: string
    period: string
  }
}

interface RevenueData {
  month: string
  revenue: number
  subscriptions: number
}

interface PaymentGatewayStats {
  gateway: string
  transactions: number
  volume: number
  percentage: number
}

interface SubscriptionStats {
  status: string
  count: number
  percentage: number
}

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [revenueChart, setRevenueChart] = useState<RevenueData[]>([])
  const [paymentGatewayStats, setPaymentGatewayStats] = useState<PaymentGatewayStats[]>([])
  const [subscriptionStats, setSubscriptionStats] = useState<SubscriptionStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const response = await fetch('/data/dashboard-metrics.json')
      const data = await response.json()
      setMetrics(data.metrics)
      setRevenueChart(data.revenueChart)
      setPaymentGatewayStats(data.paymentGatewayStats)
      setSubscriptionStats(data.subscriptionStatusBreakdown)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value > 0 ? '+' : ''}${value}%`
  }

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'decrease':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4 text-slate-600" />
    }
  }

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600'
      case 'decrease':
        return 'text-red-600'
      default:
        return 'text-slate-600'
    }
  }

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316']

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Overview of your billing system performance
          </p>
        </div>
        <Button onClick={loadDashboardData} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(metrics.totalRevenue.value, metrics.totalRevenue.currency)}
                </div>
                <div className={`flex items-center space-x-1 text-xs ${getChangeColor(metrics.totalRevenue.changeType)}`}>
                  {getChangeIcon(metrics.totalRevenue.changeType)}
                  <span>{formatPercent(metrics.totalRevenue.changePercent)} from last {metrics.totalRevenue.period}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(metrics.monthlyRecurringRevenue.value, metrics.monthlyRecurringRevenue.currency)}
                </div>
                <div className={`flex items-center space-x-1 text-xs ${getChangeColor(metrics.monthlyRecurringRevenue.changeType)}`}>
                  {getChangeIcon(metrics.monthlyRecurringRevenue.changeType)}
                  <span>{formatPercent(metrics.monthlyRecurringRevenue.changePercent)} from last {metrics.monthlyRecurringRevenue.period}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.activeSubscriptions.value}</div>
                <div className={`flex items-center space-x-1 text-xs ${getChangeColor(metrics.activeSubscriptions.changeType)}`}>
                  {getChangeIcon(metrics.activeSubscriptions.changeType)}
                  <span>{formatPercent(metrics.activeSubscriptions.changePercent)} from last {metrics.activeSubscriptions.period}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalCustomers.value}</div>
                <div className={`flex items-center space-x-1 text-xs ${getChangeColor(metrics.totalCustomers.changeType)}`}>
                  {getChangeIcon(metrics.totalCustomers.changeType)}
                  <span>{formatPercent(metrics.totalCustomers.changePercent)} from last {metrics.totalCustomers.period}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.churnRate.value}%</div>
                <div className={`flex items-center space-x-1 text-xs ${getChangeColor(metrics.churnRate.changeType)}`}>
                  {getChangeIcon(metrics.churnRate.changeType)}
                  <span>{formatPercent(metrics.churnRate.changePercent)} from last {metrics.churnRate.period}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Revenue Per User</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(metrics.averageRevenuePerUser.value, metrics.averageRevenuePerUser.currency)}
                </div>
                <div className={`flex items-center space-x-1 text-xs ${getChangeColor(metrics.averageRevenuePerUser.changeType)}`}>
                  {getChangeIcon(metrics.averageRevenuePerUser.changeType)}
                  <span>{formatPercent(metrics.averageRevenuePerUser.changePercent)} from last {metrics.averageRevenuePerUser.period}</span>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue and subscription growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="right" dataKey="subscriptions" fill="#8884d8" name="Subscriptions" />
                  <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={3} name="Revenue ($)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Payment Gateway Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Gateway Usage</CardTitle>
            <CardDescription>Transaction distribution by gateway</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentGatewayStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ gateway, percentage }) => `${gateway} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {paymentGatewayStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Status */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Status</CardTitle>
            <CardDescription>Current subscription breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscriptionStats.map((stat, index) => (
                <div key={stat.status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {stat.status === 'Active' && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {stat.status === 'Trial' && <Clock className="h-4 w-4 text-blue-600" />}
                    {stat.status === 'Canceled' && <AlertCircle className="h-4 w-4 text-red-600" />}
                    {stat.status === 'Past Due' && <AlertCircle className="h-4 w-4 text-orange-600" />}
                    <span className="text-sm font-medium">{stat.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">{stat.count}</span>
                    <Badge variant="secondary">{stat.percentage}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Add New User
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Create Subscription
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Process Payment
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
