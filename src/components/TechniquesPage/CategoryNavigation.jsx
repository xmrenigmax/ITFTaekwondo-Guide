// components/techniques/CategoryNavigation.jsx
import { cn } from '../../lib/utils'

export const CategoryNavigation = ({ categories, currentCategory, onCategoryChange }) => {
  return (
    <nav className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "flex items-center space-x-2 px-6 py-4 whitespace-nowrap transition-all duration-200 border-b-2 font-semibold text-sm md:text-base",
                currentCategory === category.id
                  ? "text-primary border-primary bg-primary/5"
                  : "text-foreground/70 border-transparent hover:text-primary hover:bg-primary/5"
              )}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}