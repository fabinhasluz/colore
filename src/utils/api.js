// API utility functions for COLORÊ platform

const API_BASE_URL = '/api'

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  
  const config = { ...defaultOptions, ...options }
  
  try {
    const response = await fetch(url, config)
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Erro na requisição')
    }
    
    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// API functions
export const api = {
  // Submit user preferences
  submitPreferences: async (preferences) => {
    return apiRequest('/submit-preferences', {
      method: 'POST',
      body: JSON.stringify(preferences)
    })
  },

  // Get preferences for preview
  getPreferences: async (sessionId) => {
    return apiRequest(`/preview-preferences/${sessionId}`)
  },

  // Create payment intent
  createPaymentIntent: async (sessionId) => {
    return apiRequest('/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId })
    })
  },

  // Confirm payment
  confirmPayment: async (sessionId, paymentData) => {
    return apiRequest('/confirm-payment', {
      method: 'POST',
      body: JSON.stringify({
        session_id: sessionId,
        payment_data: paymentData
      })
    })
  },

  // Generate e-book
  generateEbook: async (orderId) => {
    return apiRequest('/generate-ebook', {
      method: 'POST',
      body: JSON.stringify({ order_id: orderId })
    })
  },

  // Get e-book generation status
  getEbookStatus: async (orderId) => {
    return apiRequest(`/ebook-status/${orderId}`)
  },

  // Get download URL
  getDownloadUrl: (orderId) => {
    return `${API_BASE_URL}/download-ebook/${orderId}`
  },

  // Health check
  healthCheck: async () => {
    return apiRequest('/health')
  }
}

export default api

