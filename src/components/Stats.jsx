// components/Stats.jsx
export const Stats = () => {
  return (
    // Stats section with subtle background for visual separation
    <section className="py-16 bg-background/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid layout for responsive stat display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          {/* First Stat: 24 Patterns (Tul) */}
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-5xl font-bold text-primary mb-3">24</h3>
            <p className="text-lg text-foreground/80 font-medium">Tul (Patterns)</p>
            <p className="text-sm text-foreground/60 mt-1">From Chon-Ji to Tong-Il</p>
          </div>
          
          {/* Second Stat: 100+ Techniques */}
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-5xl font-bold text-primary mb-3">100+</h3>
            <p className="text-lg text-foreground/80 font-medium">Techniques</p>
            <p className="text-sm text-foreground/60 mt-1">Stances, Blocks, Strikes & Kicks</p>
          </div>
          
          {/* Third Stat: Founding Date */}
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-3xl font-bold text-primary mb-3">11th April 1955</h3>
            <p className="text-lg text-foreground/80 font-medium">Founded</p>
            <p className="text-sm text-foreground/60 mt-1">By General Choi Hong Hi</p>
          </div>
        </div>
        
        {/* Inspirational quote section */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-foreground/70 italic text-lg">
            "Refrain from reckless and thoughtless actions. Be as calm and judicious as a mountain."
          </p>
          <p className="text-foreground/50 mt-3 text-sm">- General Choi Hong Hi</p>
        </div>
        
      </div>
    </section>
  )
}