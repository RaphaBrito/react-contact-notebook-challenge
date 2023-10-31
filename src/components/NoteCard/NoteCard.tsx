import styles from "../../styles/card.module.css";

import type { Note } from "../../types/Note";

interface NoteCardInput {
  note: Note;
  isMutating: boolean;
  onDelete: (id: number) => void;
  onEdit: () => void;
}

export function NoteCard({
  note,
  isMutating,
  onDelete,
  onEdit,
}: NoteCardInput) {
  return (
    <div className={styles.card}>
      <h3>{note.title}</h3>
      <p>{note.description}</p>

      <div className={styles.cardFooter}>
        <button onClick={onEdit}>Editar</button>
        <button onClick={() => onDelete(note.id)}>Remover</button>
      </div>
    </div>
  );
}
