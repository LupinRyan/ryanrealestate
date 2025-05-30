import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Gethouses from './components/Gethouses';
import Addhouse from './components/Addhouse';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import Navbar from './components/Navbar';
import AboutUs from './components/Aboutus';
import Chatbot from './components/Chatbot';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Confirmation from './components/Confirmation'; // Import the Confirmation component

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>

        {/* Below are the different paths/urls */}
        <Routes>
          <Route path='/' element={<Gethouses/>} />
          <Route path='/addhouse' element={<Addhouse/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/makepayment' element={<Makepayment/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>
          <Route path='/chatbot' element={<Chatbot/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/confirmation' element={<Confirmation/>}/> {/* Added Confirmation route */}
          <Route path='/*' element={<Notfound/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;