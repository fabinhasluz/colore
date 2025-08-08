import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Components
import Header from './components/Header'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import Customize from './pages/Customize'
import Preview from './pages/Preview'
import Payment from './pages/Payment'
import Generation from './pages/Generation'
import Download from './pages/Download'

function App() {
  const [userPreferences, setUserPreferences] = useState({
    basicInfo: {
      name: '',
      age: '',
      gender: ''
    },
    themes: {
      favoriteAnimals: [],
      favoriteActivities: [],
      favoriteEnvironments: [],
      favoriteColors: []
    },
    personalElements: {
      hobbies: [],
      specialObjects: [],
      dreamScenarios: [],
      specialCharacters: []
    },
    stylePreferences: {
      detailLevel: 'medium',
      sceneComplexity: 'balanced',
      specificRequests: ''
    },
    images: [] // Added images array
  })

  const [orderData, setOrderData] = useState({
    orderId: null,
    status: 'pending',
    downloadUrl: null
  })

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-green-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/customize" 
              element={
                <Customize 
                  preferences={userPreferences}
                  setPreferences={setUserPreferences}
                />
              } 
            />
            <Route 
              path="/preview" 
              element={
                <Preview 
                  preferences={userPreferences}
                  setPreferences={setUserPreferences}
                />
              } 
            />
            <Route 
              path="/payment" 
              element={
                <Payment 
                  preferences={userPreferences}
                  setOrderData={setOrderData}
                />
              } 
            />
            <Route 
              path="/generation" 
              element={
                <Generation 
                  orderData={orderData}
                  setOrderData={setOrderData}
                />
              } 
            />
            <Route 
              path="/download" 
              element={
                <Download 
                  orderData={orderData}
                />
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

