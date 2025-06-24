'use client';

// Для отримання динамічного id в клієнтському компоненті використовуйте хук useParams(). Зверніть увагу, що він повертає значення параметрів у форматі рядка, а у нас id це число, тому обов'язково потрібно привести його до числа, щоб відповідати інтерфейсу Note.

// Обов‘язково у клієнтському компоненті NoteDetailsClient опрацюйте стани isLoading, error та випадок коли детальну інформацію по нотатці не було отримано в клієнтському компоненті NoteDetailsClient. Поки що буде достатньо повернути наступну розмітку:

// isLoading
// <p>Loading, please wait...</p>

// error, !note
// <p>Something went wrong.</p>;

import { useParams } from 'next/navigation';
import css from './NoteDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { format, parseISO } from 'date-fns';
import NoteModal from '@/components/NoteModal/NoteModal';
import { useState } from 'react';

export default function NoteDetailsClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(Number(id)),
    refetchOnMount: false,
  });

  if (isLoading) <p>Loading, please wait...</p>;
  if (error || !note) <p>Something went wrong.</p>;

  let label = '';
  let formattedDate = 'Date not available';

  if (note?.updatedAt || note?.createdAt) {
    const backendData = note?.updatedAt || note?.createdAt;
    label = note?.updatedAt ? 'Updated at: ' : 'Created at: ';
    const date = parseISO(backendData);
    formattedDate = format(date, "HH:mm, do 'of' MMMM yyyy");
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note?.title}</h2>
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className={css.editBtn}
          >
            Edit note
          </button>
        </div>
        <p className={css.content}>{note?.content}</p>
        <p className={css.date}>
          {label}
          {formattedDate}
        </p>
      </div>
      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
