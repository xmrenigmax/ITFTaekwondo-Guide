// src/pages/History.jsx
import { Timeline } from '../components/HistoryPage/Timeline'
import historyData from '../data/history/HistoryTimeline.json'

export const History = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 pt-20 pb-6 sm:pt-24 sm:pb-8 lg:pt-28 lg:pb-12"> {/* Added pt-20 for navbar space */}
      <div className="max-w-full px-4 sm:px-6 lg:px-8 mx-auto"> {/* Changed to max-w-full and better padding */}
        
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6"> {/* Smaller text */}
            ITF Taekwon-Do History
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-foreground/70 max-w-full mx-auto leading-relaxed px-2"> {/* max-w-full */}
            Journey through the remarkable history of International Taekwon-Do Federation, 
            from its founding by General Choi Hong Hi to its global presence today.
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 lg:mb-16 text-center mx-2 sm:mx-0"> {/* Added mx-2 for mobile */}
          <div className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4">🥋</div> {/* Smaller icon */}
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-3 sm:mb-4"> {/* Smaller heading */}
            The Way of the Foot and Fist
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-foreground/70 max-w-full mx-auto px-1"> {/* max-w-full, smaller text */}
            Founded on April 11, 1955, ITF Taekwon-Do has grown from a Korean martial art 
            to a global phenomenon practiced by millions worldwide.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="mb-8 sm:mb-12 lg:mb-16 px-2 sm:px-0"> {/* Added px-2 for mobile */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground text-center mb-6 sm:mb-8 lg:mb-12">
            Historical Timeline
          </h2>
          <Timeline events={historyData.timeline} />
        </div>

        {/* Legacy Section */}
        <div className="bg-background border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center mx-2 sm:mx-0"> {/* Added mx-2 for mobile */}
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground mb-3 sm:mb-4">
            Continuing the Legacy
          </h3>
          <p className="text-xs sm:text-sm text-foreground/70 max-w-full mx-auto">
            Today, ITF Taekwon-Do continues to honor General Choi's vision while adapting 
            to modern times, ensuring this traditional martial art remains relevant and 
            accessible to future generations.
          </p>
        </div>

      </div>
    </div>
  )
}