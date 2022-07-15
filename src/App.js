import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Admin from './pages/admin'

function App() {
  return (
    <div className="App">

      <Routes>
        <Route  path='/' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
