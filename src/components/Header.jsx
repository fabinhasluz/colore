import { Link, useLocation } from 'react-router-dom'
import { Palette, Heart } from 'lucide-react'

const Header = () => {
  const location = useLocation()

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-pink-400 to-purple-500 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                COLORÊ
              </h1>
              <p className="text-sm text-gray-600 -mt-1">Sua história de colorir</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-pink-500 ${
                location.pathname === '/' ? 'text-pink-500' : 'text-gray-600'
              }`}
            >
              Início
            </Link>
            <Link 
              to="/customize" 
              className={`text-sm font-medium transition-colors hover:text-pink-500 ${
                location.pathname === '/customize' ? 'text-pink-500' : 'text-gray-600'
              }`}
            >
              Personalizar
            </Link>
            <div className="flex items-center space-x-1 text-pink-500">
              <Heart className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">Feito com amor</span>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link 
              to="/customize"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
            >
              Começar
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

