
export const TimelineItem = ({ event, isActive, onClick }) => {
  return (
    <div 
      className={`relative flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:scale-[1.01] sm:hover:scale-[1.02] w-full ${
        isActive 
          ? 'bg-primary/10 border-primary shadow-sm sm:shadow-md' 
          : 'bg-background border-border hover:border-primary/50'
      }`}
      onClick={onClick}
    >
      {/* Timeline line connector - Hidden on mobile, visible on sm+ */}
      <div className="absolute left-3 sm:left-4 md:left-8 top-full sm:top-1/2 w-0.5 h-3 sm:h-4 bg-primary/30 -bottom-3 sm:-bottom-4 hidden sm:block"></div>
      
      {/* Icon circle - Smaller on mobile */}
      <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-lg sm:text-xl md:text-2xl border-2 sm:border-3 md:border-4 transition-all duration-300 ${
        isActive 
          ? 'bg-primary text-white border-primary' 
          : 'bg-background border-primary/30 text-primary'
      }`}>
        {event.icon}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0 w-full"> 
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 md:gap-4 mb-1 sm:mb-2">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary">{event.year}</span>
          <span className="text-xs sm:text-sm text-foreground/60 bg-primary/10 px-2 py-0.5 sm:px-2 sm:py-1 rounded-full self-start">
            {event.category}
          </span>
        </div>
        
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-1 sm:mb-2 line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-foreground/70 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 sm:line-clamp-3">
          {event.description}
        </p>
        
        <div className="text-xs text-foreground/50 mt-1 sm:mt-2">
          {event.date}
        </div>
      </div>
      
      {/* Expand indicator - Smaller on mobile */}
      <div className={`flex-shrink-0 transition-transform duration-300 self-center sm:self-auto ${
        isActive ? 'rotate-180' : ''
      }`}>
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}