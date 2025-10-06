

/**
 * HeroSection component
 * Renders the top full-screen intro section with animated text
 * and a scroll indicator prompting the user to explore more
 */
export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col px-4"
    >
      {/* Centered content container */}
      <div className="flex-1 flex items-center justify-center">
        <div className="container max-w-4xl mx-auto text-center z-10">
          {/* Vertical spacing between elements */}
          <div className="space-y-6">
            {/* Animated heading with staggered fade-in effects */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-glow">
              <span className="opacity-0 animate-fade-in"> Hi I'm </span>
              <span className="opacity-0 hero-name animate-fade-in-delay1">Riley&nbsp;</span>
              <span className="opacity-0 text-gradient animate-fade-in-delay2">Jordan</span>
            </h1>

            {/* Subheading paragraph with fade-in animation */}
            <p className="opacity-0 text-glow text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-delay3">
              An aspiring software engineer currently studying at Bournemouth University.
              with high aspirations, and specialisation in back-end development.
            </p>

            {/* Call-to-action button with fade-in animation */}
            <div className="pt-4 opacity-0 animate-fade-in-delay4">
              <a href="#projects" className="cosmic-button text-glow">
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator fixed at the bottom center */}
      <div className="relative z-10 w-full flex justify-center pb-8">
        <div className="flex flex-col items-center animate-float">
          {/* Label for scroll action */}
          <span className="text-sm text-muted-foreground mb-2 text-glow">Scroll</span>

          {/* Down arrow icon from lucide-react */}
        </div>
      </div>
    </section>
  )
}