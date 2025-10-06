// pages/Home.jsx
import { Hero } from '../components/Hero'
import { Stats } from '../components/Stats'
import { FeaturedGrid } from '../components/FeaturedGrid'
import { PhilosophySection } from '../components/PhilosophySection'
import { Slideshow } from '../components/Slideshow'

export const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Slideshow />
      <Stats />
      <FeaturedGrid />
      <PhilosophySection />
    </div>
  )
}