// Hero section for the Patterns page
export const PatternHero = () => {
  return (
    <section className="pt-16 bg-gradient-to-br from-primary to-primary/10 border-b border-primary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 drop-shadow-lg">
            ITF <span className="text-blue-800">Patterns</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 mb-8 max-w-3xl mx-auto">
            The 24 Tul of Taekwondo - From basic forms to master-level artistry
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <span className="bg-white/20 text-foreground px-4 py-2 rounded-full">24 Patterns</span>
            <span className="bg-white/20 text-foreground px-4 py-2 rounded-full">White to Black Belt</span>
            <span className="bg-white/20 text-foreground px-4 py-2 rounded-full">1084 Total Movements</span>
          </div>
        </div>
      </div>
    </section>
  )
}