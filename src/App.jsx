import './styles/global.css';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Details from './components/Details';
import RSVP from './components/RSVP';
import Wishes from './components/Wishes';
import Gift from './components/Gift';
import Footer from './components/Footer';
import Gallery from './components/Gallery';

export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <Details />
      <Gallery/>
      <RSVP />
      <Wishes />
      <Gift />
      <Footer />
    </>
  );
}
