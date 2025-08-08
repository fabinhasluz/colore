import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  Sparkles, 
  Palette, 
  Download,
  CheckCircle,
  Clock
} from 'lucide-react'

const Generation = ({ orderData, setOrderData }) => {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { id: 0, title: "Analisando suas preferências", description: "Processando suas respostas do questionário..." },
    { id: 1, title: "Criando prompts personalizados", description: "Gerando 15 prompts únicos no estilo Bobby Goods..." },
    { id: 2, title: "Gerando ilustrações", description: "Criando suas páginas de colorir personalizadas..." },
    { id: 3, title: "Finalizando o e-book", description: "Compilando tudo em um PDF lindo para você..." },
    { id: 4, title: "Pronto!", description: "Seu e-book personalizado está pronto para download!" }
  ]

  useEffect(() => {
    if (!orderData.orderId) {
      navigate('/customize')
      return
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2
        
        // Update current step based on progress
        if (newProgress >= 20 && currentStep < 1) {
          setCurrentStep(1)
        } else if (newProgress >= 40 && currentStep < 2) {
          setCurrentStep(2)
        } else if (newProgress >= 80 && currentStep < 3) {
          setCurrentStep(3)
        } else if (newProgress >= 100 && currentStep < 4) {
          setCurrentStep(4)
          // Simulate completion
          setTimeout(() => {
            setOrderData(prev => ({
              ...prev,
              status: 'completed',
              downloadUrl: `/api/download-ebook/${orderData.orderId}`
            }))
            navigate('/download')
          }, 2000)
        }
        
        return Math.min(newProgress, 100)
      })
    }, 200)

    return () => clearInterval(interval)
  }, [orderData.orderId, currentStep, navigate, setOrderData])

  if (!orderData.orderId) {
    return null
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl animate-pulse">
            <Sparkles className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          Criando seu COLORÊ personalizado
        </h1>
        <p className="text-gray-600">
          Estamos trabalhando na criação do seu e-book único. Isso pode levar alguns minutos...
        </p>
      </div>

      {/* Order Info */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">Pedido #{orderData.orderId}</h3>
              <p className="text-sm text-gray-600">Email: {orderData.email}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-purple-600">R$ 59,90</p>
              <p className="text-sm text-gray-600">Pagamento confirmado</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Section */}
      <Card className="border-0 shadow-xl">
        <CardContent className="p-8 space-y-8">
          {/* Progress Bar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Progresso</h3>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Current Step */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              {currentStep < 4 ? (
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl animate-pulse">
                  <Palette className="h-8 w-8 text-white" />
                </div>
              ) : (
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-xl">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
              )}
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {steps[currentStep].title}
              </h4>
              <p className="text-gray-600">
                {steps[currentStep].description}
              </p>
            </div>
          </div>

          {/* Steps List */}
          <div className="space-y-4">
            {steps.slice(0, -1).map((step, index) => (
              <div key={step.id} className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h5 className={`font-medium ${
                    index <= currentStep ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </h5>
                  <p className={`text-sm ${
                    index <= currentStep ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Estimated Time */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <h5 className="font-medium text-yellow-800">Tempo estimado</h5>
                <p className="text-sm text-yellow-700">
                  {currentStep < 4 
                    ? `Aproximadamente ${Math.max(1, 5 - Math.floor(progress / 20))} minutos restantes`
                    : 'Concluído!'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* What's Being Created */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h5 className="font-semibold text-purple-800 mb-3">O que está sendo criado para você:</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-purple-600" />
                <span className="text-purple-700">15 páginas únicas de colorir</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-purple-600" />
                <span className="text-purple-700">Estilo Bobby Goods autêntico</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-purple-600" />
                <span className="text-purple-700">Baseado nas suas preferências</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-purple-600" />
                <span className="text-purple-700">Alta qualidade para impressão</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fun Fact */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-pink-50 to-orange-50">
        <CardContent className="p-6 text-center">
          <h5 className="font-semibold text-gray-800 mb-2">💡 Você sabia?</h5>
          <p className="text-gray-600 text-sm leading-relaxed">
            Cada página do seu e-book é criada individualmente usando inteligência artificial, 
            garantindo que você tenha uma experiência de colorir completamente única e personalizada!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Generation

