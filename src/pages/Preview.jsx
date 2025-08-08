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
        {/* Basic Info */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-blue-500" />
                <span>Informações Básicas</span>
              </div>
              <Button variant="ghost" size="sm" onClick={goToCustomize}>
                <Edit className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Nome</h4>
              <p className="text-gray-600">{preferences.basicInfo.name || 'Não informado'}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Idade</h4>
              <p className="text-gray-600">{preferences.basicInfo.age || 'Não informado'}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Gênero</h4>
              <p className="text-gray-600 capitalize">{preferences.basicInfo.gender || 'Não informado'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Theme Preferences */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-red-50 rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Heart className="h-5 w-5 text-pink-500" />
                <span>Preferências Temáticas</span>
              </div>
              <Button variant="ghost" size="sm" onClick={goToCustomize}>
                <Edit className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Animais Favoritos</h4>
              {renderBadges(preferences.themes.favoriteAnimals)}
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Atividades Favoritas</h4>
              {renderBadges(preferences.themes.favoriteActivities)}
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Ambientes Favoritos</h4>
              {renderBadges(preferences.themes.favoriteEnvironments)}
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Cores Favoritas</h4>
              {renderBadges(preferences.themes.favoriteColors)}
            </div>
          </CardContent>
        </Card>

        {/* Personal Elements */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Palette className="h-5 w-5 text-purple-500" />
                <span>Elementos Pessoais</span>
              </div>
              <Button variant="ghost" size="sm" onClick={goToCustomize}>
                <Edit className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Hobbies</h4>
              {renderBadges(preferences.personalElements.hobbies)}
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Objetos Especiais</h4>
              {renderBadges(preferences.personalElements.specialObjects)}
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Cenários dos Sonhos</h4>
              {renderBadges(preferences.personalElements.dreamScenarios)}
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Personagens Especiais</h4>
              {renderBadges(preferences.personalElements.specialCharacters)}
            </div>
          </CardContent>
        </Card>

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
            {preferences.images && preferences.images.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  {preferences.images.length} foto(s) enviada(s) para personalização
                </p>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {preferences.images.map((image, index) => (
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

        {/* Style Preferences */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Settings className="h-5 w-5 text-green-500" />
                <span>Estilo e Finalização</span>
              </div>
              <Button variant="ghost" size="sm" onClick={goToCustomize}>
                <Edit className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Nível de Detalhamento</h4>
              <Badge variant="outline" className="bg-green-100 text-green-700">
                {getDetailLevelText(preferences.stylePreferences.detailLevel)}
              </Badge>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Complexidade das Cenas</h4>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                {getComplexityText(preferences.stylePreferences.sceneComplexity)}
              </Badge>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Pedidos Específicos</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {preferences.stylePreferences.specificRequests || 'Nenhum pedido específico'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-pink-50 to-purple-50">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Sparkles className="h-16 w-16 text-purple-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Seu COLORÊ está quase pronto!
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Com base nas suas preferências, criaremos <strong>15 páginas únicas de colorir</strong> no 
                estilo Bobby Goods, especialmente personalizadas para você. Cada página será uma nova 
                aventura para colorir e se divertir!
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h4 className="text-lg font-semibold text-gray-800">
                    E-book COLORÊ Personalizado
                  </h4>
                  <p className="text-gray-600">15 páginas únicas de colorir</p>
                  <p className="text-sm text-gray-500">Entrega instantânea por email</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-purple-600">R$ 59,90</p>
                  <p className="text-sm text-gray-500">Pagamento único</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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

