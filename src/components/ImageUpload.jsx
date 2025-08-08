import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  User,
  AlertCircle
} from 'lucide-react'

const ImageUpload = ({ images, setImages, maxImages = 5 }) => {
  const [dragActive, setDragActive] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const validateFile = (file) => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      return 'Por favor, selecione apenas arquivos de imagem.'
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return 'A imagem deve ter no máximo 10MB.'
    }
    
    return null
  }

  const processFiles = (files) => {
    setUploadError('')
    const fileArray = Array.from(files)
    
    // Check total number of images
    if (images.length + fileArray.length > maxImages) {
      setUploadError(`Você pode enviar no máximo ${maxImages} imagens.`)
      return
    }

    const validFiles = []
    
    for (const file of fileArray) {
      const error = validateFile(file)
      if (error) {
        setUploadError(error)
        return
      }
      validFiles.push(file)
    }

    // Process valid files
    validFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage = {
          id: Date.now() + Math.random(),
          file: file,
          preview: e.target.result,
          name: file.name
        }
        setImages(prev => [...prev, newImage])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files)
    }
  }, [images.length, maxImages])

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files)
    }
  }

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId))
    setUploadError('')
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-lg font-medium">
          Fotos das Pessoas (opcional)
        </Label>
        <p className="text-sm text-gray-600">
          Envie fotos das pessoas que você gostaria de ver retratadas no livro de colorir. 
          Isso nos ajudará a criar desenhos que realmente representem vocês!
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-purple-500 bg-purple-50' 
            : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-purple-100 p-4 rounded-full">
              <Upload className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-2">
              Arraste suas fotos aqui
            </h4>
            <p className="text-gray-600 mb-4">
              ou clique para selecionar arquivos
            </p>
            <Button variant="outline" type="button">
              <ImageIcon className="h-4 w-4 mr-2" />
              Escolher Fotos
            </Button>
          </div>
          
          <div className="text-xs text-gray-500">
            Formatos aceitos: JPG, PNG, GIF • Máximo: {maxImages} fotos • Tamanho máximo: 10MB por foto
          </div>
        </div>
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{uploadError}</span>
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="space-y-4">
          <h5 className="font-medium text-gray-800">
            Fotos Enviadas ({images.length}/{maxImages})
          </h5>
          
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
  {Array.isArray(images) && images.map((img) => (
    <Card key={img.id} className="relative group overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-square relative">
          <img
            src={img.preview}
            alt={img.name}
            className="w-full h-full object-cover"
          />
        </div>
      </CardContent>
    </Card>
  ))}
</div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    
                    {/* Image Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <p className="text-xs truncate">{image.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h5 className="font-medium text-blue-800 mb-2 flex items-center">
          <User className="h-4 w-4 mr-2" />
          Dicas para melhores resultados:
        </h5>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Use fotos com boa iluminação e qualidade</li>
          <li>• Prefira fotos onde o rosto está bem visível</li>
          <li>• Evite fotos muito escuras ou desfocadas</li>
          <li>• Você pode enviar fotos de diferentes pessoas</li>
          <li>• As características serão adaptadas para o estilo Bobby Goods</li>
        </ul>
      </div>
    </div>
  )
}

export default ImageUpload

