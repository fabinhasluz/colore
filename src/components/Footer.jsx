import { Heart, Mail, Instagram, Facebook } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white/90 backdrop-blur-sm border-t border-pink-100 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-pink-400 to-purple-500 p-2 rounded-lg">
                <Heart className="h-5 w-5 text-white fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-lg bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  COLORÊ
                </h3>
                <p className="text-xs text-gray-600">Sua história de colorir</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Criamos e-books de colorir personalizados no estilo Bobby Goods, 
              transformando suas preferências em 15 páginas únicas de diversão e relaxamento.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Links Úteis</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-gray-600 hover:text-pink-500 transition-colors">
                Como funciona
              </a>
              <a href="#" className="block text-sm text-gray-600 hover:text-pink-500 transition-colors">
                Exemplos de e-books
              </a>
              <a href="#" className="block text-sm text-gray-600 hover:text-pink-500 transition-colors">
                Política de privacidade
              </a>
              <a href="#" className="block text-sm text-gray-600 hover:text-pink-500 transition-colors">
                Termos de uso
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-pink-500" />
                <span className="text-sm text-gray-600">contato@colore.com.br</span>
              </div>
              <div className="flex space-x-3">
                <a href="#" className="p-2 bg-pink-100 rounded-lg hover:bg-pink-200 transition-colors">
                  <Instagram className="h-4 w-4 text-pink-600" />
                </a>
                <a href="#" className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                  <Facebook className="h-4 w-4 text-blue-600" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-100 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-600">
            © 2025 COLORÊ. Todos os direitos reservados. Feito com{' '}
            <Heart className="inline h-4 w-4 text-pink-500 fill-current" />{' '}
            para você.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

