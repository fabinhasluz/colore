import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import ImageUpload from '@/components/ImageUpload'
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Heart, 
  Palette, 
  Settings,
  CheckCircle,
  Camera
} from 'lucide-react'

const Customize = ({ preferences, setPreferences }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const navigate = useNavigate()

  const steps = [
    { id: 1, title: "Informações Básicas", icon: <User className="h-5 w-5" /> },
    { id: 2, title: "Preferências Temáticas", icon: <Heart className="h-5 w-5" /> },
    { id: 3, title: "Elementos Pessoais", icon: <Palette className="h-5 w-5" /> },
    { id: 4, title: "Fotos das Pessoas", icon: <Camera className="h-5 w-5" /> },
    { id: 5, title: "Estilo e Finalização", icon: <Settings className="h-5 w-5" /> }
  ]

  const updatePreferences = (section, field, value) => {
    setPreferences(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const toggleArrayItem = (section, field, item) => {
    setPreferences(prev => {
      const currentArray = prev[section][field] || []
      const newArray = currentArray.includes(item)
        ? currentArray.filter(i => i !== item)
        : [...currentArray, item]
      
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray
        }
      }
    })
  }

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      navigate('/preview')
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return preferences.basicInfo.name.trim() !== ''
      case 2:
        return preferences.themes.favoriteAnimals.length > 0 || 
               preferences.themes.favoriteActivities.length > 0
      case 3:
        return true // Optional step
      case 4:
        return true // Optional step (images)
      case 5:
        return true // Optional step
      default:
        return false
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Bar */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Personalize seu COLORÊ
          </h1>
          <span className="text-sm text-gray-600">
            Passo {currentStep} de 5
          </span>
        </div>
        
        <div className="flex space-x-2">
          {steps.map((step) => (
            <div key={step.id} className="flex-1">
              <div className={`h-2 rounded-full transition-all duration-300 ${
                step.id <= currentStep 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600' 
                  : 'bg-gray-200'
              }`} />
              <div className={`mt-2 text-xs font-medium transition-colors ${
                step.id <= currentStep ? 'text-purple-600' : 'text-gray-400'
              }`}>
                {step.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg">
          <CardTitle className="flex items-center space-x-3">
            {steps[currentStep - 1].icon}
            <span>{steps[currentStep - 1].title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2 mb-8">
                <h3 className="text-xl font-semibold text-gray-800">
                  Vamos começar conhecendo você!
                </h3>
                <p className="text-gray-600">
                  Essas informações nos ajudam a personalizar melhor seu e-book.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    placeholder="Como você gostaria de ser chamado?"
                    value={preferences.basicInfo.name}
                    onChange={(e) => updatePreferences('basicInfo', 'name', e.target.value)}
                    className="text-lg p-3"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Sua idade (opcional)"
                    value={preferences.basicInfo.age}
                    onChange={(e) => updatePreferences('basicInfo', 'age', e.target.value)}
                    className="text-lg p-3"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Gênero (opcional)</Label>
                <RadioGroup 
                  value={preferences.basicInfo.gender}
                  onValueChange={(value) => updatePreferences('basicInfo', 'gender', value)}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="feminino" id="feminino" />
                    <Label htmlFor="feminino">Feminino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="masculino" id="masculino" />
                    <Label htmlFor="masculino">Masculino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="outro" id="outro" />
                    <Label htmlFor="outro">Outro</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 2: Theme Preferences */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center space-y-2 mb-8">
                <h3 className="text-xl font-semibold text-gray-800">
                  Quais são seus temas favoritos?
                </h3>
                <p className="text-gray-600">
                  Selecione os elementos que mais gosta para incluirmos no seu e-book.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-medium mb-4 block">Animais Favoritos</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Ursinhos', 'Gatinhos', 'Cachorrinhos', 'Coelhinhos', 'Passarinhos', 'Borboletas', 'Peixinhos', 'Outros'].map((animal) => (
                      <div key={animal} className="flex items-center space-x-2">
                        <Checkbox
                          id={animal}
                          checked={preferences.themes.favoriteAnimals.includes(animal)}
                          onCheckedChange={() => toggleArrayItem('themes', 'favoriteAnimals', animal)}
                        />
                        <Label htmlFor={animal} className="text-sm">{animal}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-medium mb-4 block">Atividades Favoritas</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Piquenique', 'Leitura', 'Pintura', 'Jardinagem', 'Cozinhar', 'Brincar', 'Música', 'Dançar', 'Esportes'].map((activity) => (
                      <div key={activity} className="flex items-center space-x-2">
                        <Checkbox
                          id={activity}
                          checked={preferences.themes.favoriteActivities.includes(activity)}
                          onCheckedChange={() => toggleArrayItem('themes', 'favoriteActivities', activity)}
                        />
                        <Label htmlFor={activity} className="text-sm">{activity}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-medium mb-4 block">Ambientes Favoritos</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Jardim', 'Casa aconchegante', 'Praia', 'Floresta', 'Montanhas', 'Cidade', 'Campo', 'Parque'].map((environment) => (
                      <div key={environment} className="flex items-center space-x-2">
                        <Checkbox
                          id={environment}
                          checked={preferences.themes.favoriteEnvironments.includes(environment)}
                          onCheckedChange={() => toggleArrayItem('themes', 'favoriteEnvironments', environment)}
                        />
                        <Label htmlFor={environment} className="text-sm">{environment}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-medium mb-4 block">Cores Favoritas</Label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {['Rosa', 'Azul', 'Verde', 'Amarelo', 'Roxo', 'Laranja', 'Vermelho', 'Marrom'].map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox
                          id={color}
                          checked={preferences.themes.favoriteColors.includes(color)}
                          onCheckedChange={() => toggleArrayItem('themes', 'favoriteColors', color)}
                        />
                        <Label htmlFor={color} className="text-sm">{color}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Personal Elements */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center space-y-2 mb-8">
                <h3 className="text-xl font-semibold text-gray-800">
                  Elementos pessoais especiais
                </h3>
                <p className="text-gray-600">
                  Conte-nos sobre coisas especiais que gostaria de ver no seu e-book.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-medium mb-4 block">Hobbies e Interesses</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Fotografia', 'Viagem', 'Culinária', 'Artesanato', 'Tecnologia', 'Natureza', 'Filmes', 'Livros', 'Jogos'].map((hobby) => (
                      <div key={hobby} className="flex items-center space-x-2">
                        <Checkbox
                          id={hobby}
                          checked={preferences.personalElements.hobbies.includes(hobby)}
                          onCheckedChange={() => toggleArrayItem('personalElements', 'hobbies', hobby)}
                        />
                        <Label htmlFor={hobby} className="text-sm">{hobby}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-medium mb-4 block">Objetos Especiais</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Brinquedo favorito', 'Livro especial', 'Instrumento musical', 'Bicicleta', 'Boneca', 'Carrinho', 'Pelúcia', 'Coleção'].map((object) => (
                      <div key={object} className="flex items-center space-x-2">
                        <Checkbox
                          id={object}
                          checked={preferences.personalElements.specialObjects.includes(object)}
                          onCheckedChange={() => toggleArrayItem('personalElements', 'specialObjects', object)}
                        />
                        <Label htmlFor={object} className="text-sm">{object}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-medium mb-4 block">Cenários dos Sonhos</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Casa na árvore', 'Castelo de princesa', 'Nave espacial', 'Ilha tropical', 'Cabana na montanha', 'Jardim mágico'].map((scenario) => (
                      <div key={scenario} className="flex items-center space-x-2">
                        <Checkbox
                          id={scenario}
                          checked={preferences.personalElements.dreamScenarios.includes(scenario)}
                          onCheckedChange={() => toggleArrayItem('personalElements', 'dreamScenarios', scenario)}
                        />
                        <Label htmlFor={scenario} className="text-sm">{scenario}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-medium mb-4 block">Personagens Especiais</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Pet da família', 'Melhor amigo', 'Irmão/irmã', 'Avós', 'Personagem favorito', 'Super-herói'].map((character) => (
                      <div key={character} className="flex items-center space-x-2">
                        <Checkbox
                          id={character}
                          checked={preferences.personalElements.specialCharacters.includes(character)}
                          onCheckedChange={() => toggleArrayItem('personalElements', 'specialCharacters', character)}
                        />
                        <Label htmlFor={character} className="text-sm">{character}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Image Upload */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="text-center space-y-2 mb-8">
                <h3 className="text-xl font-semibold text-gray-800">
                  Fotos das pessoas especiais
                </h3>
                <p className="text-gray-600">
                  Envie fotos das pessoas que você gostaria de ver retratadas no livro de colorir.
                </p>
              </div>

              <ImageUpload 
                images={preferences.images || []}
                setImages={(images) => setPreferences(prev => ({ ...prev, images }))}
                maxImages={5}
              />
            </div>
          )}

          {/* Step 5: Style Preferences */}
          {currentStep === 5 && (
            <div className="space-y-8">
              <div className="text-center space-y-2 mb-8">
                <h3 className="text-xl font-semibold text-gray-800">
                  Últimos ajustes de estilo
                </h3>
                <p className="text-gray-600">
                  Defina como você gostaria que seu e-book fosse criado.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-lg font-medium">Nível de Detalhamento</Label>
                  <RadioGroup 
                    value={preferences.stylePreferences.detailLevel}
                    onValueChange={(value) => updatePreferences('stylePreferences', 'detailLevel', value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="simple" id="simple" />
                      <div>
                        <Label htmlFor="simple" className="font-medium">Simples</Label>
                        <p className="text-sm text-gray-600">Desenhos com poucos detalhes, ideal para crianças pequenas</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="medium" id="medium" />
                      <div>
                        <Label htmlFor="medium" className="font-medium">Médio</Label>
                        <p className="text-sm text-gray-600">Equilíbrio entre simplicidade e detalhes</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="detailed" id="detailed" />
                      <div>
                        <Label htmlFor="detailed" className="font-medium">Detalhado</Label>
                        <p className="text-sm text-gray-600">Muitos detalhes para colorir, ideal para adultos</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="text-lg font-medium">Complexidade das Cenas</Label>
                  <RadioGroup 
                    value={preferences.stylePreferences.sceneComplexity}
                    onValueChange={(value) => updatePreferences('stylePreferences', 'sceneComplexity', value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="simple" id="scene-simple" />
                      <div>
                        <Label htmlFor="scene-simple" className="font-medium">Cenas Simples</Label>
                        <p className="text-sm text-gray-600">Poucos elementos por página, foco no personagem principal</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="balanced" id="scene-balanced" />
                      <div>
                        <Label htmlFor="scene-balanced" className="font-medium">Equilibrado</Label>
                        <p className="text-sm text-gray-600">Mistura de cenas simples e elaboradas</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="elaborate" id="scene-elaborate" />
                      <div>
                        <Label htmlFor="scene-elaborate" className="font-medium">Cenas Elaboradas</Label>
                        <p className="text-sm text-gray-600">Cenários ricos com muitos elementos e histórias</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="specific-requests" className="text-lg font-medium">
                    Pedidos Específicos (opcional)
                  </Label>
                  <Textarea
                    id="specific-requests"
                    placeholder="Há algo específico que gostaria de incluir ou evitar no seu e-book? Conte-nos aqui!"
                    value={preferences.stylePreferences.specificRequests}
                    onChange={(e) => updatePreferences('stylePreferences', 'specificRequests', e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Anterior</span>
        </Button>

        <Button
          onClick={nextStep}
          disabled={!isStepValid()}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white flex items-center space-x-2"
        >
          <span>{currentStep === 5 ? 'Revisar' : 'Próximo'}</span>
          {currentStep === 5 ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}

export default Customize

