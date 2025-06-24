// import NoteList from '@/components/NoteList/NoteList';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { ResponseGetData } from '@/types/ResponseGetData';

type Props = {
  params: Promise<ResponseGetData>;
};

export default async function Notes({ params }: Props) {
  const { totalPages, page } = await params;
  const queryClient = new QueryClient();

  const perPage = totalPages / page;

  await queryClient.prefetchQuery({
    queryKey: ['allNotes', page, perPage],
    queryFn: () => fetchNotes(page, perPage, ''),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
