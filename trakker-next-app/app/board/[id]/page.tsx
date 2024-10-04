import { notFound } from 'next/navigation';
import { Board } from '@/components/board/Board';
import ClientWrapper from '@/components/ClientWrapper';

// This would typically come from a database or API
const boards = {
  sample: { id: 'sample', name: 'Sample Board' },
  // Add more boards as needed
};

export default function BoardPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Board: {params.id}</h1>
      <ClientWrapper>
        <Board id={params.id} />
      </ClientWrapper>
    </div>
  );
}
