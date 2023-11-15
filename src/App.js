import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './styles/App.css';
import Navbar from './components/NavBar/NavBar';
import { AuthContext } from './context'; 
import AppRouter from './components/AppRouter/AppRouter';

function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(localStorage.getItem('auth')){
      
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);


  return (
    <div className="App">
      <AuthContext.Provider value={{isAuth, setIsAuth, isLoading}}>
        <BrowserRouter>
          <Navbar />
          <AppRouter />
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
