import { notFound } from 'next/navigation';
import { Board } from '@/components/board/Board';

// This would typically come from a database or API
const boards = {
  sample: { id: 'sample', name: 'Sample Board' },
  // Add more boards as needed
};

export default function BoardPage({ params }: { params: { id: string } }) {
  const board = boards[params.id as keyof typeof boards];

  if (!board) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{board.name}</h1>
      <Board id={board.id} />
    </div>
  );
}
