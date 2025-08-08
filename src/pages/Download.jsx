import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Download as DownloadIcon, 
  CheckCircle, 
  Mail, 
  Printer,
  Share2,
  Star,
  Heart,
  ArrowRight,
  Gift
} from 'lucide-react'

const Download = ({ orderData }) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)
    
    // Simulate download
    setTimeout(() => {
      // In a real app, this would trigger the actual download
      const link = document.createElement('a')
      link.href = '#' // This would be the actual PDF URL
      link.download = `COLORE-${orderData.orderId}.pdf`
      // link.click()
      
      setIsDownloading(false)
      setShowFeedback(true)
    }, 2000)
  }

  const handleEmailResend = () => {
    // Simulate email resend
    alert('E-book reenviado para seu email!')
  }

  if (!orderData.orderId) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Pedido não encontrado</h1>
        <p className="text-gray-600">Não conseguimos encontrar seu pedido. Por favor, verifique se você completou o processo de compra.</p>
        <Link to="/customize">
          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
            Criar Novo E-book
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Success Header */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-3xl">
            <CheckCircle className="h-16 w-16 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎉 Seu COLORÊ está pronto!
          </h1>
          <p className="text-xl text-gray-600">
            Parabéns! Seu e-book personalizado foi criado com sucesso.
          </p>
        </div>
      </div>

      {/* Order Summary */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gift className="h-6 w-6 text-green-500" />
            <span>Detalhes do seu pedido</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Informações do Pedido</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-600">Pedido:</span> <span className="font-medium">#{orderData.orderId}</span></p>
                <p><span className="text-gray-600">Email:</span> <span className="font-medium">{orderData.email}</span></p>
                <p><span className="text-gray-600">Valor:</span> <span className="font-medium text-green-600">R$ 59,90</span></p>
                <p><span className="text-gray-600">Status:</span> <span className="font-medium text-green-600">Concluído</span></p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Seu E-book Inclui</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>15 páginas únicas de colorir</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Estilo Bobby Goods autêntico</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Personalizado com suas preferências</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Alta qualidade para impressão</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Download Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Download Card */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DownloadIcon className="h-6 w-6 text-blue-500" />
              <span>Baixar seu E-book</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600">
              Clique no botão abaixo para baixar seu e-book personalizado em formato PDF.
            </p>
            
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 text-lg font-semibold"
            >
              {isDownloading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Preparando download...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <DownloadIcon className="h-5 w-5" />
                  <span>Baixar COLORÊ (PDF)</span>
                </div>
              )}
            </Button>

            <div className="space-y-3">
              <Button
                variant="outline"
                onClick={handleEmailResend}
                className="w-full flex items-center space-x-2"
              >
                <Mail className="h-4 w-4" />
                <span>Reenviar por email</span>
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Também enviamos uma cópia para <strong>{orderData.email}</strong>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Printer className="h-6 w-6 text-green-500" />
              <span>Dicas para impressão</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p><strong>Papel:</strong> Use papel sulfite A4 (75g ou 90g) para melhor resultado</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p><strong>Qualidade:</strong> Configure a impressora para "Alta qualidade" ou "Melhor"</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p><strong>Cores:</strong> Imprima em preto e branco para colorir</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p><strong>Margens:</strong> Use configuração "Ajustar à página" se necessário</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-semibold text-blue-800 mb-2">💡 Dica especial</h5>
              <p className="text-blue-700 text-sm">
                Para uma experiência ainda melhor, use lápis de cor, canetinhas ou giz de cera. 
                Cada página foi criada pensando na diversão de colorir!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Section */}
      {showFeedback && (
        <Card className="border-0 shadow-xl bg-gradient-to-r from-pink-50 to-purple-50">
          <CardContent className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <Heart className="h-12 w-12 text-pink-500 fill-current" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Adoramos criar para você!
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Esperamos que você se divirta muito colorindo seu e-book personalizado. 
                Se gostou da experiência, que tal compartilhar com seus amigos?
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="flex items-center space-x-2">
                <Star className="h-4 w-4" />
                <span>Avaliar experiência</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>Compartilhar</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Another */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardContent className="p-8 text-center space-y-6">
          <h3 className="text-2xl font-bold">
            Quer criar outro e-book?
          </h3>
          <p className="text-lg opacity-90">
            Cada e-book é único! Crie diferentes versões para presentear ou ter mais opções para colorir.
          </p>
          <Link to="/customize">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Criar Novo COLORÊ
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default Download

