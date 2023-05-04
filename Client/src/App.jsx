import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Form from './components/Form'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/form' element={<Form />} />
      </Routes>
        
    </BrowserRouter>
  )
}

export default App
