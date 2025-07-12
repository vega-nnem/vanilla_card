
import React, { useState } from 'react'
import { User, Lock, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface AdminLoginProps {
  isAdmin: boolean
  onLogin: (username: string, password: string) => Promise<boolean>
  onLogout: () => void
}

const AdminLogin: React.FC<AdminLoginProps> = ({ isAdmin, onLogin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const success = await onLogin(username, password)
      if (success) {
        setIsOpen(false)
        setUsername('')
        setPassword('')
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError('Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    onLogout()
    setUsername('')
    setPassword('')
  }

  if (isAdmin) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-400/10"
      >
        <LogOut size={16} className="mr-1" />
        Admin
      </Button>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-foreground/80 hover:text-foreground hover:bg-accent dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10"
        >
          <User size={16} className="mr-1" />
          Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-morphic border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white">Admin Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="glass-input"
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input"
              required
            />
          </div>
          {error && (
            <div className="text-red-400 text-sm">{error}</div>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full premium-button neon-glow"
          >
            {isLoading ? (
              <>
                <Lock size={16} className="mr-2 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <Lock size={16} className="mr-2" />
                Login
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AdminLogin
