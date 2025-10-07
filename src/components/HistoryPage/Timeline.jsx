
import { useState } from 'react'
import { TimelineItem } from './TimelineItem'

// Timeline Component
export const Timeline = ({ events }) => {
  const [activeEvent, setActiveEvent] = useState(null)

  return (
    <div className="relative w-full max-w-full mx-auto"> 
      {/* Main timeline line - Hidden on mobile, visible on sm+ */}
      <div className="absolute left-2 sm:left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary/30 rounded-full hidden sm:block"></div> 
      
      <div className="space-y-3 sm:space-y-6 relative w-full"> 
        {events.map((event, index) => (
          <div key={event.id} className="relative w-full">
            <TimelineItem 
              event={event}
              isActive={activeEvent === event.id}
              onClick={() => setActiveEvent(activeEvent === event.id ? null : event.id)}
            />
            
            {/* Detailed content when active */}
            {activeEvent === event.id && (
              <div className="mt-2 sm:mt-3 ml-0 sm:ml-12 md:ml-20 p-3 sm:p-4 md:p-6 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg sm:rounded-xl md:rounded-2xl w-full"> 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 w-full">
                  <div className="w-full">
                    <h4 className="font-semibold text-foreground mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">Background</h4>
                    <p className="text-foreground/70 text-xs leading-relaxed w-full">
                      {event.detailed.background}
                    </p>
                  </div>
                  
                  <div className="w-full">
                    <h4 className="font-semibold text-foreground mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">Significance</h4>
                    <p className="text-foreground/70 text-xs leading-relaxed w-full">
                      {event.detailed.significance}
                    </p>
                  </div>
                  
                  {/* Additional details based on event type */}
                  {event.detailed.keyFigures && (
                    <div className="md:col-span-2 w-full">
                      <h4 className="font-semibold text-foreground mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">Key Figures</h4>
                      <div className="flex flex-wrap gap-1 sm:gap-2 w-full">
                        {event.detailed.keyFigures.map((figure, idx) => (
                          <span key={idx} className="bg-primary/20 text-primary px-2 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs">
                            {figure}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {event.detailed.foundingCountries && (
                    <div className="md:col-span-2 w-full">
                      <h4 className="font-semibold text-foreground mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">Founding Countries</h4>
                      <div className="flex flex-wrap gap-1 sm:gap-2 w-full">
                        {event.detailed.foundingCountries.map((country, idx) => (
                          <span key={idx} className="bg-primary/20 text-primary px-2 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs">
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}