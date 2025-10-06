import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Techniques } from './pages/Techniques'
import { Patterns } from './pages/Patterns'
import { Terminology } from './pages/Terminology'
import { NotFound } from './pages/NotFound'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
          <Routes>
            <Route index element={<Home/>} />
            <Route path="/techniques" element={<Techniques/>} />
            <Route path="/patterns" element={<Patterns/>} />
            <Route path="/terminology" element={<Terminology/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App