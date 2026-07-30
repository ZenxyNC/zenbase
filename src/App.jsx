import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './index.css'
import './resources/font-jakartaSans/importFont.css'

import Base from './routes/base'

export default function App() {

  return (
    <Router basename='/zenbase'>
      <Routes>
        <Route path='/:page' element={<Base />}/>
        <Route path='/*' element={<Base />}/>
      </Routes>
    </Router>
  )
}