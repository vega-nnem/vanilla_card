
import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useTheme } from '@/hooks/useTheme'

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex items-center space-x-2">
      <Sun size={16} className={`transition-colors ${theme === 'light' ? 'text-yellow-400' : 'text-gray-400'}`} />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-yellow-400"
      />
      <Moon size={16} className={`transition-colors ${theme === 'dark' ? 'text-blue-400' : 'text-gray-400'}`} />
    </div>
  )
}

export default ThemeToggle
