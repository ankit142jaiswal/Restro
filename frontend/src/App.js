import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screen/Home';
import Login from './screen/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './screen/Signup';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css' ;
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screen/MyOrder.js';
function App() {
  return (
    <CartProvider>

    <Router>
      <Navbar/>
      <div className='App' >
        <Routes>
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/myOrder' element={<MyOrder />} />


          
        </Routes>
      </div>
      <Footer/>
    </Router>
    </CartProvider>
  );
}

export default App;
