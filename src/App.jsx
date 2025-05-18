import { Routes , Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Result from './pages/Result'
import Form from './pages/Form'
import Contact from './pages/Contact'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/resultats' element={<Result />} />
        <Route path='/formulaire' element={<Form />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </BrowserRouter>
     
    
  )
}

export default App
