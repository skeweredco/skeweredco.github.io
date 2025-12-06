import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Events from './components/Events';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Home />
        <About />
        <Services />
        <Events />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
