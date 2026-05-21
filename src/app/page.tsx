import { Header } from '../components/organisms/Header';
import { Hero } from '../components/organisms/Hero';
import { ServiceSplit } from '../components/organisms/ServiceSplit';
import { Services } from '../components/organisms/Services';
import { About } from '../components/organisms/About';
import { Process } from '../components/organisms/Process';
import { Testimonials } from '../components/organisms/Testimonials';
import { CTA } from '../components/organisms/CTA';
import { Contact } from '../components/organisms/Contact';
import { Footer } from '../components/organisms/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ServiceSplit />
        <Services />
        <About />
        <Process />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
