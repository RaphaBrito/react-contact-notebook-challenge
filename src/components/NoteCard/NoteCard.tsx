import "./NoteCard.css";

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
    <div className="card">
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      <div>
        <button onClick={() => onDelete(note.id)}>Remover</button>
        <button onClick={onEdit}>Editar</button>
      </div>
    </div>
  );
}
