import { BrowserRouter } from 'react-router-dom'
import Main from './components/Main'


function App() {
  return (
    <div className="bg-black h-full w-full overflow-x-hidden">
      <BrowserRouter>
      <Main/>    
      </BrowserRouter>
    </div>
  )
}

export default App
