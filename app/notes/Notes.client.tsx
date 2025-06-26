'use client';

import { fetchNotes } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import NoteModal from '@/components/NoteModal/NoteModal';
import { ResponseGetData } from '@/types/ResponseGetData';

type Props = {
  initialData: ResponseGetData;
};

export default function NotesClient({ initialData }: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedQuery] = useDebounce(search, 1000);

  const perPage = 12;

  const allNotes = useQuery({
    queryKey: ['allNotes', debouncedQuery, page],
    queryFn: () => fetchNotes(page, perPage, debouncedQuery),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    initialData: page === 1 && search === '' ? initialData : undefined,
  });

  function handleSearch(search: string) {
    setSearch(search);
    setPage(1);
  }

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onSearch={handleSearch} value={search} />

        {allNotes.isSuccess && allNotes.data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={allNotes.data.totalPages}
            onPageChange={setPage}
          />
        )}
        <button
          className={css.button}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Create note +
        </button>
      </div>
      {allNotes.isSuccess && allNotes.data.notes.length > 0 && (
        <NoteList items={allNotes.data.notes} />
      )}
      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
