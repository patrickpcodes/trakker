import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Trakker</h1>
      <p className="text-xl">Manage your tasks efficiently with our intuitive board system.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/board/sample" passHref>
          <Button variant="outline" className="w-full h-full p-6 flex flex-col items-start">
            <h2 className="text-xl font-semibold mb-2">Sample Board</h2>
            <p className="text-sm text-muted-foreground">Click to view the sample board</p>
          </Button>
        </Link>
        <Link href="/board/new" passHref>
          <Button variant="outline" className="w-full h-full p-6 flex flex-col items-start">
            <h2 className="text-xl font-semibold mb-2">Create New Board</h2>
            <p className="text-sm text-muted-foreground">Start a new project board</p>
          </Button>
        </Link>
      </div>
    </div>
  );
}
