import { AudioPlayer } from './AudioPlayer'
import { cn } from '../../lib/utils'

/**
 * Belt Color Configuration
 * 
 * Comprehensive mapping of Taekwondo belt colors to their corresponding
 * CSS classes for consistent visual representation across the application.
 * 
 * @type {Object}
 */
const BELT_COLOR_MAP = {
  'White': 'bg-white border-gray-300 text-gray-800 shadow-sm',
  'White-Yellow': 'bg-gradient-to-r from-white from-70% to-yellow-400 to-70% border-gray-300 text-gray-800 shadow-sm',
  'Yellow': 'bg-yellow-400 border-yellow-500 text-yellow-900 shadow-md',
  'Yellow-Green': 'bg-gradient-to-r from-yellow-400 from-70% to-green-500 to-70% border-yellow-500 text-white shadow-md',
  'Green': 'bg-green-500 border-green-600 text-white shadow-md',
  'Green-Blue': 'bg-gradient-to-r from-green-500 from-70% to-blue-500 to-70% border-green-600 text-white shadow-md',
  'Blue': 'bg-blue-500 border-blue-600 text-white shadow-md',
  'Blue-Red': 'bg-gradient-to-r from-blue-500 from-70% to-red-500 to-70% border-blue-600 text-white shadow-md',
  'Red': 'bg-red-500 border-red-600 text-white shadow-md',
  'Red-Black': 'bg-gradient-to-r from-red-500 from-70% to-black to-70% border-red-600 text-white shadow-md',
  'Black': 'bg-black border-gray-800 text-white shadow-lg'
}

/**
 * Terminology Table Component
 * 
 * Professional data table component for displaying ITF Taekwondo terminology
 * with comprehensive filtering, sorting, and accessibility features.
 * 
 * Features:
 * - Responsive table design with horizontal scrolling
 * - Belt color coding with gradient support
 * - Integrated audio pronunciation players
 * - Hover effects and smooth transitions
 * - Accessibility-compliant table structure
 * - Professional styling with consistent design language
 * 
 * @param {Object} props - Component properties
 * @param {Array<TerminologyTerm>} props.terms - Array of terminology term objects
 * @param {string} [props.className] - Additional CSS classes for container customization
 * 
 * @returns {JSX.Element} Terminology table component
 * 
 * @example
 * <TerminologyTable 
 *   terms={terminologyData}
 *   className="my-8"
 * />
 */

/**
 * Terminology Term Type Definition
 * 
 * @typedef {Object} TerminologyTerm
 * @property {string} id - Unique identifier for the term
 * @property {string} englishName - English translation of the term
 * @property {string} koreanName - Korean characters (Hangul)
 * @property {string} romanized - Romanized pronunciation guide
 * @property {string} sound - Audio file path for pronunciation
 * @property {string} beltLearnt - Belt level when term is introduced
 * @property {string} meaning - Detailed explanation of the term
 * @property {string} [category] - Optional category classification
 */

export const TerminologyTable = ({ terms, className }) => {
  // ===== UTILITY FUNCTIONS =====

  /**
   * Gets CSS classes for belt color representation
   * @param {string} beltColor - Belt color name from terminology data
   * @returns {string} CSS classes for styling the belt badge
   */
  const getBeltColorClass = (beltColor) => {
    return BELT_COLOR_MAP[beltColor] || 'bg-gray-200 border-gray-300 text-gray-800 shadow-sm'
  }

  // ===== RENDER METHODS =====

  /**
   * Renders table header with column definitions
   * @returns {JSX.Element} Table header component
   */
  const renderTableHeader = () => (
    <thead className="bg-primary/5 border-b border-border">
      <tr>
        <th className="text-left p-4 font-semibold text-foreground text-sm uppercase tracking-wide">
          English
        </th>
        <th className="text-left p-4 font-semibold text-foreground text-sm uppercase tracking-wide">
          Korean
        </th>
        <th className="text-left p-4 font-semibold text-foreground text-sm uppercase tracking-wide">
          Romanized
        </th>
        <th className="text-left p-4 font-semibold text-foreground text-sm uppercase tracking-wide">
          Pronunciation
        </th>
        <th className="text-left p-4 font-semibold text-foreground text-sm uppercase tracking-wide">
          Belt Level
        </th>
        <th className="text-left p-4 font-semibold text-foreground text-sm uppercase tracking-wide">
          Meaning
        </th>
      </tr>
    </thead>
  )

  /**
   * Renders individual terminology table row
   * @param {TerminologyTerm} term - Terminology term object
   * @param {number} index - Row index for animation and key
   * @returns {JSX.Element} Table row component
   */
  const renderTableRow = (term, index) => (
    <tr 
      key={term.id}
      className={cn(
        "hover:bg-primary/5 transition-all duration-200 border-b border-border/50",
        "group cursor-default",
        index % 2 === 0 ? "bg-background" : "bg-muted/30"
      )}
      style={{
        animationDelay: `${index * 50}ms`
      }}
    >
      {/* English Name */}
      <td className="p-4 font-medium text-foreground group-hover:text-primary transition-colors">
        {term.englishName}
      </td>
      
      {/* Korean Name */}
      <td className="p-4 font-medium text-primary font-korean text-lg">
        {term.koreanName}
      </td>
      
      {/* Romanized Pronunciation */}
      <td className="p-4 text-foreground/70 font-mono text-sm">
        {term.romanized}
      </td>
      
      {/* Audio Pronunciation */}
      <td className="p-4">
        <AudioPlayer 
          audioSrc={term.sound} 
          term={term.englishName}
          className="min-w-[200px]"
        />
      </td>
      
      {/* Belt Level Badge */}
      <td className="p-4">
        <span 
          className={cn(
            "px-3 py-1 rounded-full text-xs font-semibold border-2",
            "transition-all duration-300 hover:scale-105",
            "shadow-sm hover:shadow-md",
            getBeltColorClass(term.beltLearnt)
          )}
          aria-label={`Learned at ${term.beltLearnt} belt level`}
        >
          {term.beltLearnt}
        </span>
      </td>
      
      {/* Meaning Description */}
      <td className="p-4 text-foreground/70 text-sm leading-relaxed">
        {term.meaning}
      </td>
    </tr>
  )

  /**
   * Renders empty state when no terms are available
   * @returns {JSX.Element} Empty state component
   */
  const renderEmptyState = () => (
    <tbody>
      <tr>
        <td 
          colSpan="6" 
          className="p-8 text-center text-foreground/50 italic"
        >
          <div className="flex flex-col items-center gap-3">
            <svg 
              className="w-12 h-12 text-foreground/30" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1} 
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
              />
            </svg>
            <p className="text-lg font-medium">No terminology terms found</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
          </div>
        </td>
      </tr>
    </tbody>
  )

  // ===== MAIN COMPONENT RENDER =====

  return (
    <div 
      className={cn(
        "bg-background border border-border rounded-2xl shadow-lg overflow-hidden",
        "transition-all duration-300 hover:shadow-xl",
        className
      )}
      role="region"
      aria-label="Taekwondo terminology table"
    >
      <div className="overflow-x-auto">
        <table 
          className="w-full"
          role="grid"
          aria-label="ITF Taekwondo terminology terms"
        >
          {renderTableHeader()}
          
          <tbody className="divide-y divide-border/50">
            {terms.length > 0 
              ? terms.map(renderTableRow)
              : renderEmptyState()
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

/**
 * TerminologyTable Prop Types (for documentation)
 * 
 * @typedef {Object} TerminologyTableProps
 * @property {Array<TerminologyTerm>} terms - Array of terminology term objects
 * @property {string} [className] - Additional CSS classes for container customization
 */