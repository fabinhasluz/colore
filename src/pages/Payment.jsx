import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  CreditCard, 
  Shield, 
  Lock,
  CheckCircle,
  QrCode,
  Mail
} from 'lucide-react'

const Payment = ({ preferences, setOrderData }) => {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    cpf: ''
  })

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value)
    updateFormData('cardNumber', formatted)
  }

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value)
    updateFormData('expiryDate', formatted)
  }

  const processPayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      const orderId = 'COLORE-' + Date.now()
      setOrderData({
        orderId: orderId,
        status: 'processing',
        downloadUrl: null,
        email: formData.email,
        paymentMethod: paymentMethod,
        amount: 59.90,
        preferences: preferences
      })
      
      setIsProcessing(false)
      navigate('/generation')
    }, 3000)
  }

  const goBack = () => {
    navigate('/preview')
  }

  const isFormValid = () => {
    if (paymentMethod === 'credit-card') {
      return formData.email && 
             formData.cardNumber.replace(/\s/g, '').length >= 16 && 
             formData.expiryDate.length === 5 && 
             formData.cvv.length >= 3 && 
             formData.cardName && 
             formData.cpf
    } else {
      return formData.email && formData.cpf
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-2xl">
            <CreditCard className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          Finalizar Pagamento
        </h1>
        <p className="text-gray-600">
          Último passo para receber seu e-book personalizado!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-500" />
                <span>Informações de Contato</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="text-lg p-3"
                />
                <p className="text-sm text-gray-600">
                  Seu e-book será enviado para este email
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={(e) => updateFormData('cpf', e.target.value)}
                  className="text-lg p-3"
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Método de Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-blue-500" />
                    <Label htmlFor="credit-card" className="font-medium">Cartão de Crédito</Label>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="pix" id="pix" />
                  <div className="flex items-center space-x-2">
                    <QrCode className="h-5 w-5 text-green-500" />
                    <Label htmlFor="pix" className="font-medium">PIX</Label>
                  </div>
                </div>
              </RadioGroup>

              {paymentMethod === 'credit-card' && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Nome no Cartão *</Label>
                    <Input
                      id="cardName"
                      placeholder="Nome como está no cartão"
                      value={formData.cardName}
                      onChange={(e) => updateFormData('cardName', e.target.value)}
                      className="text-lg p-3"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número do Cartão *</Label>
                    <Input
                      id="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                      className="text-lg p-3"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Validade *</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/AA"
                        value={formData.expiryDate}
                        onChange={handleExpiryChange}
                        maxLength={5}
                        className="text-lg p-3"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => updateFormData('cvv', e.target.value)}
                        maxLength={4}
                        className="text-lg p-3"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'pix' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">
                    Após confirmar o pedido, você receberá o código PIX para pagamento. 
                    Seu e-book será gerado automaticamente após a confirmação do pagamento.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Info */}
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Pagamento Seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-blue-500" />
              <span>SSL Criptografado</span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg sticky top-8">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">E-book COLORÊ Personalizado</span>
                  <span className="font-medium">R$ 59,90</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>15 páginas únicas de colorir</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Entrega instantânea</span>
                  <span className="text-green-600 font-medium">Grátis</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-purple-600">R$ 59,90</span>
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>15 páginas personalizadas</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Estilo Bobby Goods</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Alta qualidade para impressão</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Entrega em até 15 minutos</span>
                </div>
              </div>

              <Button
                onClick={processPayment}
                disabled={!isFormValid() || isProcessing}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 text-lg font-semibold"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processando...</span>
                  </div>
                ) : (
                  `Finalizar Pagamento - R$ 59,90`
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-start">
        <Button
          variant="outline"
          onClick={goBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para Revisão</span>
        </Button>
      </div>
    </div>
  )
}

export default Payment

