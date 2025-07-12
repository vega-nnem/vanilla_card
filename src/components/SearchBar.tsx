
import React, { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchResult {
  id: string
  title: string
  content: string
  url?: string
}

interface SearchBarProps {
  onSearch?: (query: string) => void
  isExpanded: boolean
  onToggle: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isExpanded, onToggle }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    
    // TODO: Replace with actual backend API call
    // This would connect to your admin-controlled search results
    setTimeout(() => {
      // Mock results - replace with actual API call
      const mockResults: SearchResult[] = [
        {
          id: '1',
          title: 'Gift Card Redemption',
          content: 'Learn how to redeem your gift cards easily',
          url: '#redeem'
        },
        {
          id: '2',
          title: 'Donation Process',
          content: 'Make secure donations with our platform',
          url: '#donate'
        }
      ].filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
      
      setResults(mockResults)
      setIsLoading(false)
    }, 300)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    handleSearch(value)
    onSearch?.(value)
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    onToggle()
  }

  if (!isExpanded) {
    return (
      <button
        onClick={onToggle}
        className="p-2 text-foreground/80 hover:text-foreground dark:text-gray-300 dark:hover:text-white transition-colors"
        aria-label="Open search"
      >
        <Search size={20} />
      </button>
    )
  }

  return (
    <div className="relative">
      <div className="flex items-center glass-morphic rounded-lg px-3 py-2">
        <Search size={16} className="text-muted-foreground dark:text-gray-400 mr-2" />
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          className="bg-transparent border-none text-foreground dark:text-white placeholder-muted-foreground dark:placeholder-gray-400 focus:ring-0 focus:outline-none"
          autoFocus
        />
        <button
          onClick={clearSearch}
          className="p-1 text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Search Results Dropdown */}
      {query && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-morphic rounded-lg p-2 z-50 min-w-[300px]">
          {isLoading ? (
            <div className="text-muted-foreground dark:text-gray-400 text-sm p-2">Searching...</div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              {results.map((result) => (
                <a
                  key={result.id}
                  href={result.url || '#'}
                  className="block p-2 rounded hover:bg-accent dark:hover:bg-white/10 transition-colors"
                  onClick={clearSearch}
                >
                  <div className="text-foreground dark:text-white text-sm font-medium">{result.title}</div>
                  <div className="text-muted-foreground dark:text-gray-400 text-xs">{result.content}</div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground dark:text-gray-400 text-sm p-2">No results found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
