import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api';

export default async function Notes() {
  const notes = await fetchNotes(1, 12, '');
  console.log('notes: ', notes);

  return (
    <>
      <NoteList items={notes.notes} />
    </>
  );
}

// import { fetchNotes } from '@/lib/api';
// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from '@tanstack/react-query';

// import NotesClient from './Notes.client';

// type Props = {
//   params: Promise<{ id: number }>;
// };

// export default async function NoteDetails({ params }: Props) {
//   const { id } = await params;
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ['notes', id],
//     queryFn: () => fetchNotes(1, 12, ''),
//   });

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <NotesClient />
//     </HydrationBoundary>
//   );
// }
