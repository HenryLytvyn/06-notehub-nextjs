// Внесіть зміну у розмітку компонента NoteList.

import { Note } from '@/types/note';
import css from './NoteList.module.css';
import NoteItem from '../NoteItem/NoteItem';

type Props = {
  items: Note[];
};

export default function NoteList({ items }: Props) {
  return (
    <ul className={css.list}>
      {items
        // .filter(note => note.id)
        .map(el => (
          <NoteItem key={el.id} item={el} />
        ))}
    </ul>
  );
}
