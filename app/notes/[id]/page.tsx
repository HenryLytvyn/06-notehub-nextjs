// Реалізуйте сторінковий компонент NoteDetails у маршруті /notes/[id] як SSR-компонент, де заздалегідь виконується prefetch (попереднє завантаження даних через TanStack Query) з гідратацією кеша. Усю клієнтську логіку (отримання даних нотатки за допомогою useQuery та їх відображення) винесіть в окремий файл компонента app/notes/NoteDetails.client.tsx.

//! SSR component

import { fetchNoteById } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetails({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(Number(id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {id && <NoteDetailsClient />}
    </HydrationBoundary>
  );
}
