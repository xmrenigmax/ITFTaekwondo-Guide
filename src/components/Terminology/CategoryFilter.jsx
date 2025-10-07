
// CategoryFilter 
export const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onCategoryChange('')}
        className={`px-4 py-2 rounded-full border transition-all duration-200 ${
          selectedCategory === '' 
            ? 'bg-primary text-white border-primary' 
            : 'bg-background text-foreground/70 border-border hover:bg-primary/10 hover:text-foreground'
        }`}
      >
        All Terms
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full border transition-all duration-200 ${
            selectedCategory === category 
              ? 'bg-primary text-white border-primary' 
              : 'bg-background text-foreground/70 border-border hover:bg-primary/10 hover:text-foreground'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}