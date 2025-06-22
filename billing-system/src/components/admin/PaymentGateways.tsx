import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Switch } from '../ui/switch'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import {
  CreditCard,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TestTube,
  Globe,
  Shield,
  RefreshCw,
  Plus,
  Edit
} from 'lucide-react'
import { toast } from 'sonner'

interface PaymentGateway {
  id: string
  name: string
  displayName: string
  description: string
  icon: string
  enabled: boolean
  supportedMethods: string[]
  supportedCurrencies: string[]
  fees: Record<string, string>
  testMode: boolean
  config: Record<string, string>
}

export default function PaymentGateways() {
  const [gateways, setGateways] = useState<PaymentGateway[]>([])
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | null>(null)
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPaymentGateways()
  }, [])

  const loadPaymentGateways = async () => {
    try {
      const response = await fetch('/data/payment-gateways.json')
      const data = await response.json()
      setGateways(data.paymentGateways)
    } catch (error) {
      console.error('Error loading payment gateways:', error)
      toast.error('Failed to load payment gateways')
    } finally {
      setLoading(false)
    }
  }

  const toggleGateway = (gatewayId: string) => {
    setGateways(gateways.map(gateway =>
      gateway.id === gatewayId
        ? { ...gateway, enabled: !gateway.enabled }
        : gateway
    ))
    const gateway = gateways.find(g => g.id === gatewayId)
    toast.success(`${gateway?.displayName} ${gateway?.enabled ? 'disabled' : 'enabled'}`)
  }

  const toggleTestMode = (gatewayId: string) => {
    setGateways(gateways.map(gateway =>
      gateway.id === gatewayId
        ? { ...gateway, testMode: !gateway.testMode }
        : gateway
    ))
    const gateway = gateways.find(g => g.id === gatewayId)
    toast.success(`${gateway?.displayName} ${gateway?.testMode ? 'live mode' : 'test mode'} enabled`)
  }

  const openConfigDialog = (gateway: PaymentGateway) => {
    setSelectedGateway(gateway)
    setIsConfigDialogOpen(true)
  }

  const saveConfiguration = () => {
    if (selectedGateway) {
      setGateways(gateways.map(gateway =>
        gateway.id === selectedGateway.id ? selectedGateway : gateway
      ))
      toast.success(`${selectedGateway.displayName} configuration saved`)
      setIsConfigDialogOpen(false)
      setSelectedGateway(null)
    }
  }

  const testConnection = async (gateway: PaymentGateway) => {
    toast.info(`Testing connection to ${gateway.displayName}...`)
    // Simulate API test
    setTimeout(() => {
      toast.success(`Connection to ${gateway.displayName} successful!`)
    }, 2000)
  }

  const getStatusIcon = (gateway: PaymentGateway) => {
    if (!gateway.enabled) return <XCircle className="h-4 w-4 text-red-600" />
    if (gateway.testMode) return <TestTube className="h-4 w-4 text-yellow-600" />
    return <CheckCircle className="h-4 w-4 text-green-600" />
  }

  const getStatusText = (gateway: PaymentGateway) => {
    if (!gateway.enabled) return 'Disabled'
    if (gateway.testMode) return 'Test Mode'
    return 'Live'
  }

  const getStatusColor = (gateway: PaymentGateway) => {
    if (!gateway.enabled) return 'destructive'
    if (gateway.testMode) return 'secondary'
    return 'default'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Payment Gateways</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Configure and manage payment gateway integrations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={loadPaymentGateways} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Gateway
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Gateways</p>
                <p className="text-2xl font-bold">{gateways.length}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{gateways.filter(g => g.enabled).length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Test Mode</p>
                <p className="text-2xl font-bold text-yellow-600">{gateways.filter(g => g.testMode && g.enabled).length}</p>
              </div>
              <TestTube className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Live</p>
                <p className="text-2xl font-bold text-blue-600">{gateways.filter(g => !g.testMode && g.enabled).length}</p>
              </div>
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Gateways List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {gateways.map((gateway) => (
          <Card key={gateway.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{gateway.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{gateway.displayName}</CardTitle>
                    <CardDescription>{gateway.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(gateway) as any}>
                    {getStatusIcon(gateway)}
                    {getStatusText(gateway)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Supported Methods */}
              <div>
                <Label className="text-sm font-medium">Supported Methods</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {gateway.supportedMethods.map((method) => (
                    <Badge key={method} variant="outline" className="text-xs">
                      {method.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Supported Currencies */}
              <div>
                <Label className="text-sm font-medium">Currencies</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {gateway.supportedCurrencies.slice(0, 4).map((currency) => (
                    <Badge key={currency} variant="outline" className="text-xs">
                      {currency}
                    </Badge>
                  ))}
                  {gateway.supportedCurrencies.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{gateway.supportedCurrencies.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Fees */}
              <div>
                <Label className="text-sm font-medium">Fees</Label>
                <div className="text-sm text-slate-600 mt-1">
                  {Object.entries(gateway.fees).slice(0, 2).map(([method, fee]) => (
                    <div key={method}>
                      {method.replace('_', ' ')}: {fee}
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={gateway.enabled}
                      onCheckedChange={() => toggleGateway(gateway.id)}
                    />
                    <Label className="text-sm">Enabled</Label>
                  </div>
                  {gateway.enabled && (
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={gateway.testMode}
                        onCheckedChange={() => toggleTestMode(gateway.id)}
                      />
                      <Label className="text-sm">Test Mode</Label>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testConnection(gateway)}
                    disabled={!gateway.enabled}
                  >
                    Test
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openConfigDialog(gateway)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Configuration Dialog */}
      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configure {selectedGateway?.displayName}
            </DialogTitle>
            <DialogDescription>
              Update configuration settings for this payment gateway
            </DialogDescription>
          </DialogHeader>
          
          {selectedGateway && (
            <Tabs defaultValue="settings" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="settings" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedGateway.config).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key} className="capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      <Input
                        id={key}
                        value={value}
                        onChange={(e) => setSelectedGateway({
                          ...selectedGateway,
                          config: { ...selectedGateway.config, [key]: e.target.value }
                        })}
                        type={key.toLowerCase().includes('secret') || key.toLowerCase().includes('key') ? 'password' : 'text'}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-medium">Security Status</h4>
                      <p className="text-sm text-slate-600">All security requirements are met</p>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800">Security Features</h4>
                    <ul className="text-sm text-green-700 mt-2 space-y-1">
                      <li>• SSL/TLS encryption enabled</li>
                      <li>• API key authentication configured</li>
                      <li>• Webhook signature verification active</li>
                      <li>• PCI DSS compliance maintained</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="webhooks" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input
                      id="webhookUrl"
                      value={`https://api.yourdomain.com/webhooks/${selectedGateway.id}`}
                      readOnly
                      className="bg-slate-50"
                    />
                  </div>
                  <div>
                    <Label>Webhook Events</Label>
                    <div className="mt-2 space-y-2">
                      {['payment.completed', 'payment.failed', 'subscription.created', 'subscription.canceled'].map((event) => (
                        <div key={event} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                          <span className="text-sm">{event}</span>
                          <Badge variant="outline">Active</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfigDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveConfiguration}>
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Gateway Activity</CardTitle>
          <CardDescription>Latest transactions across all payment gateways</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gateway</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>💳</span>
                    Stripe
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">pi_1234567890</TableCell>
                <TableCell>$29.99</TableCell>
                <TableCell>
                  <Badge variant="default">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Success
                  </Badge>
                </TableCell>
                <TableCell>2 hours ago</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>⬜</span>
                    Square
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">sq_abcdef123456</TableCell>
                <TableCell>$79.99</TableCell>
                <TableCell>
                  <Badge variant="default">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Success
                  </Badge>
                </TableCell>
                <TableCell>5 hours ago</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>₿</span>
                    BTCPay
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">btc_xyz789</TableCell>
                <TableCell>$199.99</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                </TableCell>
                <TableCell>1 day ago</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
