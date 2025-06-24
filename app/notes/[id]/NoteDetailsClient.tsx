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

export default function NoteDetailsClient() {
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

  // const formattedDate = note.updatedAt
  //   ? `Updated at: ${note.updatedAt}`
  //   : `Created at: ${note.createdAt}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note?.title}</h2>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{note?.content}</p>
        <p className={css.date}>Created date</p>
      </div>
    </div>
  );
}
