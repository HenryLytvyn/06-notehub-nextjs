'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getNoteById } from '@/lib/api';

function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(Number(id)),
    refetchOnMount: false,
  });
  return <div>Note Details Client</div>;
}

export default NoteDetailsClient;
