import "./NoteCard.css";

import type { Note } from "../../types/Note";

interface NoteCardInput {
  note: Note;
  handleDelete: (id: number) => void;
  handleEdit: () => void;
}

export function NoteCard({ note, handleDelete, handleEdit }: NoteCardInput) {
  return (
    <div className="card">
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      <div>
        <button onClick={() => handleDelete(note.id)}>Remover</button>
        <button onClick={handleEdit}>Editar</button>
      </div>
    </div>
  );
}
