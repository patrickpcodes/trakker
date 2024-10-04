import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Trakker</h1>
      <p className="text-xl">Manage your tasks efficiently with our intuitive board system.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/board/sample">
          <div className="bg-card text-card-foreground p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Sample Board</h2>
            <p>Click to view the sample board</p>
          </div>
        </Link>
      </div>
    </div>
  )
}