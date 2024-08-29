import { BrowserRouter } from 'react-router-dom'
import Main from './components/Main'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



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
