import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Interests } from './sections/Interests'
import { Journey } from './sections/Journey'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'
import { Vision } from './sections/Vision'

function App() {
  return (
    <>
      <a
        href="#accueil"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-text"
      >
        Aller au contenu principal
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Vision />
        <Interests />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
