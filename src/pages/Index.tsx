import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Education from "@/components/portfolio/Education";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import AhiChat from "@/components/portfolio/AhiChat";
import Constellation from "@/components/portfolio/Constellation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Constellation />
      <Navbar />
      <main>
        <Hero />
        <About />
        {/* Skills directly above Education, as requested */}
        <Skills />
        <Education />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <AhiChat />
    </div>
  );
};

export default Index;
