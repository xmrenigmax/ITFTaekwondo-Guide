// Import
import { AudioPlayer } from './AudioPlayer'

// Helper to get belt color classes
const getBeltColorClass = (beltColor) => {
  const colorMap = {
    'White': 'bg-white border-gray-300 text-gray-800',
    'White-Yellow': 'bg-gradient-to-r from-white from-70% to-yellow-400 to-70% border-gray-300 text-gray-800',
    'Yellow': 'bg-yellow-400 border-yellow-500 text-yellow-900',
    'Yellow-Green': 'bg-gradient-to-r from-yellow-400 from-70% to-green-500 to-70% border-yellow-500 text-white',
    'Green': 'bg-green-500 border-green-600 text-white',
    'Green-Blue': 'bg-gradient-to-r from-green-500 from-70% to-blue-500 to-70% border-green-600 text-white',
    'Blue': 'bg-blue-500 border-blue-600 text-white',
    'Blue-Red': 'bg-gradient-to-r from-blue-500 from-70% to-red-500 to-70% border-blue-600 text-white',
    'Red': 'bg-red-500 border-red-600 text-white',
    'Red-Black': 'bg-gradient-to-r from-red-500 from-70% to-black to-70% border-red-600 text-white',
    'Black': 'bg-black border-gray-800 text-white'
  }
  return colorMap[beltColor] || 'bg-gray-200 border-gray-300 text-gray-800'
}

// Terminology Table Component
export const TerminologyTable = ({ terms }) => {
  return (
    <div className="bg-background border border-border rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary/10 border-b border-border">
            <tr>
              <th className="text-left p-4 font-semibold text-foreground">English</th>
              <th className="text-left p-4 font-semibold text-foreground">Korean</th>
              <th className="text-left p-4 font-semibold text-foreground">Romanized</th>
              <th className="text-left p-4 font-semibold text-foreground">Pronunciation</th>
              <th className="text-left p-4 font-semibold text-foreground">Belt</th>
              <th className="text-left p-4 font-semibold text-foreground">Meaning</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {terms.map((term) => (
              <tr key={term.id} className="hover:bg-primary/5 transition-colors">
                <td className="p-4 font-medium text-foreground">{term.englishName}</td>
                <td className="p-4 font-medium text-primary">{term.koreanName}</td>
                <td className="p-4 text-foreground/70">{term.romanized}</td>
                <td className="p-4">
                  <AudioPlayer audioSrc={term.sound} />
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getBeltColorClass(term.beltLearnt)}`}>
                    {term.beltLearnt}
                  </span>
                </td>
                <td className="p-4 text-foreground/70 text-sm">{term.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}