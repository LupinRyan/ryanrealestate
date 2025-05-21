
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css';
import Gethouses from './components/Gethouses';
import Addhouse from './components/Addhouse';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import Navbar from './components/Navbar';
import AboutUs from './components/Aboutus';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <header className="App-header">
          <h1>Lupin Crest Luxury Real Estate </h1>
        </header> */}

        <Navbar/>

        {/* Below are the links to the diffferent components
        <nav>
          <Link to={'/'} className='links'>Home</Link>
          <Link to={'/addproduct'} className='links'>Add Product</Link>
          <Link to={"/signup"} className='links'>Sign Up</Link>
          <Link to={'/signin'} className='links'>Sign In</Link>
        </nav> */}

        {/* Below are the different paths/urls */}
        <Routes>
          <Route path='/' element={<Gethouses/>} />
          <Route path='/addhouse' element={<Addhouse/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/makepayment' element={<Makepayment/>}/>
          <Route path='/*' element={<Notfound/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
