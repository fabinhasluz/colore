import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Heart, 
  Palette, 
  Settings,
  Edit,
  CheckCircle,
  Sparkles
} from 'lucide-react'

const Preview = ({ preferences, setPreferences }) => {
  const navigate = useNavigate()

  const goToCustomize = () => {
    navigate('/customize')
  }

  const proceedToPayment = () => {
    navigate('/payment')
  }

  const renderBadges = (items) => {
    if (!items || items.length === 0) return <span className="text-gray-400 italic">Nenhum selecionado</span>

    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <Badge key={index} variant="secondary" className="bg-pink-100 text-pink-700">
            {item}
          </Badge>
        ))}
      </div>
    )
  }

  const getDetailLevelText = (level) => {
    switch (level) {
      case 'simple': return 'Simples'
      case 'medium': return 'Médio'
      case 'detailed': return 'Detalhado'
      default: return 'Médio'
    }
  }

  const getComplexityText = (complexity) => {
    switch (complexity) {
      case 'simple': return 'Cenas Simples'
      case 'balanced': return 'Equilibrado'
      case 'elaborate': return 'Cenas Elaboradas'
      default: return 'Equilibrado'
    }
  }

  const safeImages = Array.isArray(preferences.images) ? preferences.images : []

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-2xl">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          Revisão das suas preferências
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Confira se está tudo correto antes de prosseguir para o pagamento. 
          Você pode editar qualquer informação se necessário.
        </p>
      </div>

      {/* Preview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ... [as is] ... */}

        {/* Images */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Sparkles className="h-5 w-5 text-green-500" />
                <span>Fotos das Pessoas</span>
              </div>
              <Button variant="ghost" size="sm" onClick={goToCustomize}>
                <Edit className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {safeImages.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  {safeImages.length} foto(s) enviada(s) para personalização
                </p>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {safeImages.map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden border">
                      <img
                        src={image.preview}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-400 italic">Nenhuma foto enviada</p>
            )}
          </CardContent>
        </Card>

        {/* ... [rest unchanged] ... */}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={goToCustomize}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Editar Preferências</span>
        </Button>

        <Button
          onClick={proceedToPayment}
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white flex items-center space-x-2 px-8"
        >
          <span>Prosseguir para Pagamento</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default Preview
