import {Head} from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import About from '../Components/About';
import Skills from '../Components/Skills';
import Projects from '../Components/Projects';
import Education from '../Components/Education';
import Contact from '../Components/Contact';
import Footer from '../Components/Footer';
export default function Portfolio({projects}){
  return <>
    <Head title="Home" />
    <a className="fixed -top-24 left-5 z-100 bg-[#a9daf8] px-4 py-3 font-bold text-[#0b0e14] focus:top-3" href="#main">Skip to content</a>
    <Navbar />
    <main id="main"><Hero/><About/><Skills/><Projects projects={projects}/><Education/><Contact/></main>
    <Footer />
  </>;
}
