import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Routes from './routes/routes'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Routes/>
  </BrowserRouter>
)


