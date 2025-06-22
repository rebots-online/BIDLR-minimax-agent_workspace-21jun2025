import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { CreditCard, Plus, RefreshCw } from 'lucide-react'

export default function SubscriptionsManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Subscriptions Management</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage customer subscriptions and billing cycles
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Subscription
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Subscriptions</p>
                <p className="text-2xl font-bold text-green-600">18</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Trial Subscriptions</p>
                <p className="text-2xl font-bold text-blue-600">4</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Canceled</p>
                <p className="text-2xl font-bold text-red-600">2</p>
              </div>
              <CreditCard className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Past Due</p>
                <p className="text-2xl font-bold text-orange-600">1</p>
              </div>
              <CreditCard className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Subscriptions</CardTitle>
          <CardDescription>Latest subscription activities and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: 'sub_001', user: 'John Doe', plan: 'Basic Plan', status: 'Active', amount: '$29.99' },
              { id: 'sub_002', user: 'Jane Smith', plan: 'Pro Plan', status: 'Trial', amount: '$79.99' },
              { id: 'sub_003', user: 'Mike Wilson', plan: 'Enterprise Plan', status: 'Active', amount: '$199.99' }
            ].map((subscription) => (
              <div key={subscription.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-medium">{subscription.user}</div>
                    <div className="text-sm text-slate-500">{subscription.plan}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={subscription.status === 'Active' ? 'default' : 'secondary'}>
                    {subscription.status}
                  </Badge>
                  <div className="font-medium">{subscription.amount}</div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
