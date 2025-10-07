
export const PhilosophySection = () => {
  return (
    // Philosophy section with subtle gradient background
    <section className="py-16 bg-gradient-to-b from-background/30 to-background/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header with decorative elements */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            The Heart of <span className="text-primary">ITF Taekwondo</span>
          </h2>
        </div>

        {/* Main philosophy content with visual hierarchy */}
        <div className="bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8 text-center md:text-left">
            At the heart of ITF Taekwondo lies a profound philosophy that extends far beyond physical technique. 
            Founded on principles of <span className="text-primary font-semibold">respect, integrity, and perseverance</span>; 
            ITF Taekwondo is a way of life that cultivates both the body & mind. We are encouraged to embody
            these values in our daily lives, fostering a spirit of humility and continuous self-improvement. 
          </p>

          {/* Key philosophy pillars in a visually appealing layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
              <div className="text-3xl mb-3">🙏</div>
              <h3 className="font-semibold text-foreground mb-2">Respect & Honour</h3>
              <p className="text-foreground/70 text-sm">
                Honouring the instructors, seniors, and the art itself through discipline
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
              <div className="text-3xl mb-3">💪</div>
              <h3 className="font-semibold text-foreground mb-2">Mental Fortitude</h3>
              <p className="text-foreground/70 text-sm">
                Develop an unwavering focus, patience, and indomitable spirit in all endeavours
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="font-semibold text-foreground mb-2">Peace & Freedom</h3>
              <p className="text-foreground/70 text-sm">
                Promoting peace, justice, and building a better world through martial virtue
              </p>
            </div>
          </div>

          {/* Inspirational quote from General Choi */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-l-4 border-primary rounded-r-lg p-6">
            <blockquote className="text-foreground/80 italic text-lg md:text-xl text-center">
             To help others to develop and succeed in life is a reward itself and only has value when nothing is expected in return
            </blockquote>
            <cite className="block mt-4 text-foreground/60 font-semibold text-right">
              — General Choi Hong Hi, Founder of ITF Taekwondo
            </cite>
          </div>
        </div>
      </div>
    </section>
  )
}