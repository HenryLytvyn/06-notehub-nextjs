'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import { Note } from '@/types/note';
import css from '../NoteList/NoteList.module.css';

type Props = {
  item: Note;
};

export default function NoteItem({ item }: Props) {
  const queryClient = useQueryClient();

  const { mutate: removeItem, isPending } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allNotes'],
      });
    },
  });
  return (
    <li key={item.id} className={css.listItem}>
      <h2 className={css.title}>{item.title}</h2>
      <p className={css.content}>{item.content}</p>
      <div className={css.footer}>
        <span className={css.tag}>{item.tag}</span>
        <button
          onClick={() => {
            removeItem(id);
          }}
          disabled={isPending}
          className={css.button}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

{
  /* <li key={id} className={css.listItem}>
  <h2 className={css.title}>{title}</h2>
  <p className={css.content}>{content}</p>
  <div className={css.footer}>
    <span className={css.tag}>{tag}</span>
    <button
      onClick={() => {
        removeItem(id);
      }}
      disabled={isPending}
      className={css.button}
    >
      Delete
    </button>
  </div>
</li>; */
}
