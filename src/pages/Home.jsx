import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Palette, 
  Heart, 
  Star, 
  Download, 
  Clock, 
  Gift,
  ArrowRight,
  Sparkles
} from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: <Palette className="h-8 w-8 text-pink-500" />,
      title: "Totalmente Personalizado",
      description: "Cada e-book é único, criado especialmente para você com base nas suas preferências e gostos pessoais."
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Estilo Bobby Goods",
      description: "Ilustrações no adorável estilo Bobby Goods, com personagens fofos e cenários aconchegantes."
    },
    {
      icon: <Download className="h-8 w-8 text-blue-500" />,
      title: "Download Instantâneo",
      description: "Receba seu e-book personalizado em poucos minutos, pronto para imprimir e colorir."
    },
    {
      icon: <Gift className="h-8 w-8 text-purple-500" />,
      title: "15 Páginas Únicas",
      description: "Cada e-book contém 15 páginas de colorir exclusivas, criadas especialmente para você."
    }
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      text: "Minha filha ficou encantada! As ilustrações são lindas e ela se reconheceu nas cenas. Recomendo muito!",
      rating: 5
    },
    {
      name: "João Santos",
      text: "Qualidade incrível! O e-book chegou rapidinho e as páginas são perfeitas para colorir. Vale cada centavo.",
      rating: 5
    },
    {
      name: "Ana Costa",
      text: "Comprei para mim mesma e adorei! É muito relaxante colorir algo feito especialmente para mim.",
      rating: 5
    }
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-12">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-2xl">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 bg-clip-text text-transparent leading-tight">
            COLORÊ
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-medium">
            Sua história de colorir
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Crie e-books de colorir personalizados no adorável estilo Bobby Goods. 
            Responda algumas perguntas e receba 15 páginas únicas feitas especialmente para você!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/customize">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              Criar Meu E-book
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="h-5 w-5" />
            <span className="text-sm">Pronto em 10 minutos</span>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 max-w-md mx-auto">
          <p className="text-yellow-800 font-medium">
            💝 15 páginas únicas de colorir por apenas R$ 59,90
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Por que escolher o COLORÊ?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Oferecemos uma experiência única de personalização que transforma suas preferências 
            em arte para colorir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Como funciona?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Em apenas 3 passos simples, você terá seu e-book personalizado pronto para colorir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Responda o questionário",
              description: "Conte-nos sobre suas preferências, gostos e elementos que gostaria de ver no seu e-book."
            },
            {
              step: "2", 
              title: "Faça o pagamento",
              description: "Pagamento seguro de R$ 59,90 via cartão de crédito ou PIX."
            },
            {
              step: "3",
              title: "Receba seu e-book",
              description: "Em poucos minutos, receba por email seu e-book personalizado pronto para imprimir e colorir."
            }
          ].map((item, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
              </div>
              <h3 className="font-semibold text-lg text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            O que nossos clientes dizem
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-gray-800">
                  {testimonial.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Pronto para criar sua história de colorir?
        </h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Comece agora e tenha seu e-book personalizado em poucos minutos. 
          Uma experiência única de colorir feita especialmente para você!
        </p>
        <Link to="/customize">
          <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            Começar Agora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>
    </div>
  )
}

export default Home

