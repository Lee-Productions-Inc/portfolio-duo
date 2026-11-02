import {Head} from '@inertiajs/react';
import Navbar from '../components/portfolio/Navbar';
import Hero from '../components/portfolio/Hero';
import About from '../components/portfolio/About';
import Skills from '../components/portfolio/Skills';
import Projects from '../components/portfolio/Projects';
import Education from '../components/portfolio/Education';
import Contact from '../components/portfolio/Contact';
import Footer from '../components/portfolio/Footer';
export default function Portfolio({projects, canManageProjects = false}){
  return <>
    <Head title="Home" />
    <a className="fixed -top-24 left-5 z-100 bg-[#a9daf8] px-4 py-3 font-bold text-[#0b0e14] focus:top-3" href="#main">Skip to content</a>
    <Navbar />
    <main id="main"><Hero/><About/><Skills/><Projects projects={projects} canManageProjects={canManageProjects}/><Education/><Contact/></main>
    <Footer />
  </>;
}
