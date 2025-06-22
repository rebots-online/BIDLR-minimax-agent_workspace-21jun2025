import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Badge } from '../ui/badge'
import { Switch } from '../ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../ui/tabs'
import {
  Calculator,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  FileText,
  Download,
  RefreshCw,
  MapPin,
  DollarSign
} from 'lucide-react'
import { toast } from 'sonner'

interface TaxRate {
  id: string
  region: string
  country: string
  state?: string
  city?: string
  rate: number
  name: string
  description: string
  registrationNumber?: string
  effective: boolean
  createdAt: string
  updatedAt: string
}

interface TaxCalculation {
  subtotal: number
  taxAmount: number
  total: number
  appliedRates: Array<{
    region: string
    rate: number
    amount: number
  }>
}

export default function TaxConfiguration() {
  const [taxRates, setTaxRates] = useState<TaxRate[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingRate, setEditingRate] = useState<TaxRate | null>(null)
  const [loading, setLoading] = useState(true)
  const [calculatorAmount, setCalculatorAmount] = useState('')
  const [calculatorRegion, setCalculatorRegion] = useState('')
  const [calculation, setCalculation] = useState<TaxCalculation | null>(null)

  const [newRate, setNewRate] = useState({
    region: '',
    country: '',
    state: '',
    city: '',
    rate: 0,
    name: '',
    description: '',
    registrationNumber: ''
  })

  useEffect(() => {
    loadTaxRates()
  }, [])

  const loadTaxRates = async () => {
    try {
      const response = await fetch('/data/tax-rates.json')
      const data = await response.json()
      setTaxRates(data.taxRates)
    } catch (error) {
      console.error('Error loading tax rates:', error)
      toast.error('Failed to load tax rates')
    } finally {
      setLoading(false)
    }
  }

  const handleAddTaxRate = () => {
    if (!newRate.region || !newRate.country || !newRate.name || newRate.rate === 0) {
      toast.error('Please fill in all required fields')
      return
    }

    const taxRate: TaxRate = {
      id: `tax_${Date.now()}`,
      region: newRate.region,
      country: newRate.country,
      state: newRate.state,
      city: newRate.city,
      rate: newRate.rate / 100, // Convert percentage to decimal
      name: newRate.name,
      description: newRate.description,
      registrationNumber: newRate.registrationNumber,
      effective: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setTaxRates([...taxRates, taxRate])
    setNewRate({
      region: '',
      country: '',
      state: '',
      city: '',
      rate: 0,
      name: '',
      description: '',
      registrationNumber: ''
    })
    setIsAddDialogOpen(false)
    toast.success('Tax rate added successfully')
  }

  const handleEditTaxRate = (rate: TaxRate) => {
    setEditingRate(rate)
    setNewRate({
      region: rate.region,
      country: rate.country,
      state: rate.state || '',
      city: rate.city || '',
      rate: rate.rate * 100, // Convert decimal to percentage
      name: rate.name,
      description: rate.description,
      registrationNumber: rate.registrationNumber || ''
    })
  }

  const handleUpdateTaxRate = () => {
    if (!editingRate || !newRate.region || !newRate.country || !newRate.name || newRate.rate === 0) {
      toast.error('Please fill in all required fields')
      return
    }

    const updatedRate: TaxRate = {
      ...editingRate,
      region: newRate.region,
      country: newRate.country,
      state: newRate.state,
      city: newRate.city,
      rate: newRate.rate / 100,
      name: newRate.name,
      description: newRate.description,
      registrationNumber: newRate.registrationNumber,
      updatedAt: new Date().toISOString()
    }

    setTaxRates(taxRates.map(r => r.id === editingRate.id ? updatedRate : r))
    setEditingRate(null)
    setNewRate({
      region: '',
      country: '',
      state: '',
      city: '',
      rate: 0,
      name: '',
      description: '',
      registrationNumber: ''
    })
    toast.success('Tax rate updated successfully')
  }

  const toggleTaxRate = (rateId: string) => {
    setTaxRates(taxRates.map(rate =>
      rate.id === rateId ? { ...rate, effective: !rate.effective } : rate
    ))
    const rate = taxRates.find(r => r.id === rateId)
    toast.success(`Tax rate ${rate?.effective ? 'deactivated' : 'activated'}`)
  }

  const deleteTaxRate = (rateId: string) => {
    setTaxRates(taxRates.filter(r => r.id !== rateId))
    toast.success('Tax rate deleted successfully')
  }

  const calculateTax = () => {
    const amount = parseFloat(calculatorAmount)
    if (!amount || !calculatorRegion) {
      toast.error('Please enter an amount and select a region')
      return
    }

    const applicableRate = taxRates.find(rate => 
      rate.region === calculatorRegion && rate.effective
    )

    if (!applicableRate) {
      toast.error('No tax rate found for selected region')
      return
    }

    const taxAmount = amount * applicableRate.rate
    const total = amount + taxAmount

    setCalculation({
      subtotal: amount,
      taxAmount,
      total,
      appliedRates: [{
        region: applicableRate.region,
        rate: applicableRate.rate,
        amount: taxAmount
      }]
    })
  }

  const exportTaxRates = () => {
    const csv = [
      ['Region', 'Country', 'State', 'City', 'Rate (%)', 'Name', 'Description', 'Registration Number', 'Status'].join(','),
      ...taxRates.map(rate => [
        rate.region,
        rate.country,
        rate.state || '',
        rate.city || '',
        (rate.rate * 100).toFixed(4),
        rate.name,
        rate.description,
        rate.registrationNumber || '',
        rate.effective ? 'Active' : 'Inactive'
      ].join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'tax-rates.csv'
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Tax rates exported successfully')
  }

  const formatPercent = (rate: number) => {
    return `${(rate * 100).toFixed(2)}%`
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Tax Configuration</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage tax rates for HST (Toronto) and USA compliance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={exportTaxRates} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Tax Rate
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Tax Rate</DialogTitle>
                <DialogDescription>
                  Configure a new tax rate for a specific region
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="region">Region Code *</Label>
                    <Input
                      id="region"
                      value={newRate.region}
                      onChange={(e) => setNewRate({ ...newRate, region: e.target.value })}
                      placeholder="e.g., CA_ON, US_NY"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Select value={newRate.country} onValueChange={(value) => setNewRate({ ...newRate, country: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="European Union">European Union</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      value={newRate.state}
                      onChange={(e) => setNewRate({ ...newRate, state: e.target.value })}
                      placeholder="e.g., Ontario, New York"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={newRate.city}
                      onChange={(e) => setNewRate({ ...newRate, city: e.target.value })}
                      placeholder="e.g., Toronto"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tax Name *</Label>
                    <Input
                      id="name"
                      value={newRate.name}
                      onChange={(e) => setNewRate({ ...newRate, name: e.target.value })}
                      placeholder="e.g., HST, Sales Tax"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate">Tax Rate (%) *</Label>
                    <Input
                      id="rate"
                      type="number"
                      step="0.01"
                      value={newRate.rate}
                      onChange={(e) => setNewRate({ ...newRate, rate: parseFloat(e.target.value) })}
                      placeholder="e.g., 13.00"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newRate.description}
                    onChange={(e) => setNewRate({ ...newRate, description: e.target.value })}
                    placeholder="e.g., Harmonized Sales Tax (Ontario)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    value={newRate.registrationNumber}
                    onChange={(e) => setNewRate({ ...newRate, registrationNumber: e.target.value })}
                    placeholder="e.g., 826393555RT0001"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTaxRate}>Add Tax Rate</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="rates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="rates">Tax Rates</TabsTrigger>
          <TabsTrigger value="calculator">Tax Calculator</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="rates" className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Tax Rates</p>
                    <p className="text-2xl font-bold">{taxRates.length}</p>
                  </div>
                  <Calculator className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active Rates</p>
                    <p className="text-2xl font-bold text-green-600">{taxRates.filter(r => r.effective).length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Canadian Rates</p>
                    <p className="text-2xl font-bold text-red-600">{taxRates.filter(r => r.country === 'Canada').length}</p>
                  </div>
                  <MapPin className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">US Rates</p>
                    <p className="text-2xl font-bold text-blue-600">{taxRates.filter(r => r.country === 'United States').length}</p>
                  </div>
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tax Rates Table */}
          <Card>
            <CardHeader>
              <CardTitle>Tax Rates Configuration</CardTitle>
              <CardDescription>
                Manage tax rates for different regions and jurisdictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Region</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Tax Name</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Registration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxRates.map((rate) => (
                    <TableRow key={rate.id}>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {rate.region}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{rate.country}</div>
                          {rate.state && (
                            <div className="text-sm text-slate-500">
                              {rate.state}{rate.city && `, ${rate.city}`}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{rate.name}</div>
                          <div className="text-sm text-slate-500">{rate.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-lg">{formatPercent(rate.rate)}</span>
                      </TableCell>
                      <TableCell>
                        {rate.registrationNumber ? (
                          <Badge variant="secondary" className="font-mono text-xs">
                            {rate.registrationNumber}
                          </Badge>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={rate.effective}
                            onCheckedChange={() => toggleTaxRate(rate.id)}
                          />
                          <Badge variant={rate.effective ? 'default' : 'secondary'}>
                            {rate.effective ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Dialog open={editingRate?.id === rate.id} onOpenChange={(open) => {
                            if (!open) setEditingRate(null)
                          }}>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditTaxRate(rate)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Tax Rate</DialogTitle>
                                <DialogDescription>
                                  Update tax rate configuration
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="editRegion">Region Code *</Label>
                                    <Input
                                      id="editRegion"
                                      value={newRate.region}
                                      onChange={(e) => setNewRate({ ...newRate, region: e.target.value })}
                                      placeholder="e.g., CA_ON, US_NY"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="editCountry">Country *</Label>
                                    <Select value={newRate.country} onValueChange={(value) => setNewRate({ ...newRate, country: value })}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select country" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Canada">Canada</SelectItem>
                                        <SelectItem value="United States">United States</SelectItem>
                                        <SelectItem value="European Union">European Union</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="editState">State/Province</Label>
                                    <Input
                                      id="editState"
                                      value={newRate.state}
                                      onChange={(e) => setNewRate({ ...newRate, state: e.target.value })}
                                      placeholder="e.g., Ontario, New York"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="editCity">City</Label>
                                    <Input
                                      id="editCity"
                                      value={newRate.city}
                                      onChange={(e) => setNewRate({ ...newRate, city: e.target.value })}
                                      placeholder="e.g., Toronto"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="editName">Tax Name *</Label>
                                    <Input
                                      id="editName"
                                      value={newRate.name}
                                      onChange={(e) => setNewRate({ ...newRate, name: e.target.value })}
                                      placeholder="e.g., HST, Sales Tax"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="editRate">Tax Rate (%) *</Label>
                                    <Input
                                      id="editRate"
                                      type="number"
                                      step="0.01"
                                      value={newRate.rate}
                                      onChange={(e) => setNewRate({ ...newRate, rate: parseFloat(e.target.value) })}
                                      placeholder="e.g., 13.00"
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="editDescription">Description</Label>
                                  <Input
                                    id="editDescription"
                                    value={newRate.description}
                                    onChange={(e) => setNewRate({ ...newRate, description: e.target.value })}
                                    placeholder="e.g., Harmonized Sales Tax (Ontario)"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="editRegistrationNumber">Registration Number</Label>
                                  <Input
                                    id="editRegistrationNumber"
                                    value={newRate.registrationNumber}
                                    onChange={(e) => setNewRate({ ...newRate, registrationNumber: e.target.value })}
                                    placeholder="e.g., 826393555RT0001"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setEditingRate(null)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleUpdateTaxRate}>Update Tax Rate</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteTaxRate(rate.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tax Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Tax Calculator
                </CardTitle>
                <CardDescription>
                  Calculate tax amounts for different regions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={calculatorAmount}
                    onChange={(e) => setCalculatorAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region">Tax Region</Label>
                  <Select value={calculatorRegion} onValueChange={setCalculatorRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {taxRates.filter(r => r.effective).map((rate) => (
                        <SelectItem key={rate.id} value={rate.region}>
                          {rate.region} - {rate.name} ({formatPercent(rate.rate)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={calculateTax} className="w-full">
                  Calculate Tax
                </Button>
              </CardContent>
            </Card>

            {/* Calculation Result */}
            {calculation && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Calculation Result
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Subtotal:</span>
                      <span className="font-medium">{formatCurrency(calculation.subtotal)}</span>
                    </div>
                    {calculation.appliedRates.map((appliedRate, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-slate-600">
                          {appliedRate.region} ({formatPercent(appliedRate.rate)}):
                        </span>
                        <span className="font-medium">{formatCurrency(appliedRate.amount)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold">Total:</span>
                        <span className="font-semibold">{formatCurrency(calculation.total)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          {/* HST Compliance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-6 h-4 bg-red-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">🇨🇦</span>
                </div>
                Canadian HST Compliance
              </CardTitle>
              <CardDescription>
                Harmonized Sales Tax compliance for Toronto operations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-800">HST Registration Active</h4>
                </div>
                <p className="text-sm text-green-700">
                  Registration Number: <span className="font-mono">826393555RT0001</span>
                </p>
                <p className="text-sm text-green-700">
                  Ontario HST Rate: 13% (GST 5% + PST 8%)
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h5 className="font-medium">Compliance Requirements</h5>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      HST registration maintained
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Quarterly filing schedule
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Invoice requirements met
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Record keeping compliant
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="font-medium">Next Filing Dates</h5>
                  <ul className="text-sm space-y-1">
                    <li className="flex justify-between">
                      <span>Q1 2024:</span>
                      <span className="font-medium">April 30, 2024</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Q2 2024:</span>
                      <span className="font-medium">July 31, 2024</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Q3 2024:</span>
                      <span className="font-medium">October 31, 2024</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* USA Tax Compliance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-6 h-4 bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">🇺🇸</span>
                </div>
                USA Tax Compliance
              </CardTitle>
              <CardDescription>
                State sales tax compliance across US jurisdictions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {taxRates.filter(r => r.country === 'United States').map((rate) => (
                  <div key={rate.id} className="bg-blue-50 p-3 rounded-lg">
                    <div className="font-medium text-blue-800">{rate.state}</div>
                    <div className="text-sm text-blue-600">{formatPercent(rate.rate)}</div>
                    <div className="text-xs text-blue-600">{rate.name}</div>
                  </div>
                ))}
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <h4 className="font-medium text-yellow-800">Nexus Considerations</h4>
                </div>
                <p className="text-sm text-yellow-700">
                  Monitor sales thresholds and physical presence rules for each state to ensure compliance with nexus requirements.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
