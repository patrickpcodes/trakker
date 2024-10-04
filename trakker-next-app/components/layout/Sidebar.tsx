import Link from 'next/link'
import { Home, Calendar, List } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="w-64 bg-background border-r h-full">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link href="/" className="flex items-center p-2 rounded-lg hover:bg-accent">
              <Home className="mr-2 h-5 w-5" data-testid="home-icon" />
              Home
            </Link>
          </li>
          <li>
            <Link href="/timeline" className="flex items-center p-2 rounded-lg hover:bg-accent">
              <Calendar className="mr-2 h-5 w-5" data-testid="calendar-icon" />
              Timeline
            </Link>
          </li>
          <li>
            <Link href="/issues" className="flex items-center p-2 rounded-lg hover:bg-accent">
              <List className="mr-2 h-5 w-5" data-testid="list-icon" />
              Issues
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}