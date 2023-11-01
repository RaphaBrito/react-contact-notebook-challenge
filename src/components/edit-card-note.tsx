import { useState } from "react";

import styles from "../styles/card.module.css";

import type { Note } from "../types/Note";

interface EditNoteCardInput {
  note: Note;
  onEdit: (formData: Note) => void;
  onCancel: () => void;
}

export function EditNoteCard({ note, onEdit, onCancel }: EditNoteCardInput) {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);

  const handleEdit = () => {
    if (title.length === 0 || description.length === 0) {
      return;
    }

    const formData = { id: note.id, title, description } satisfies Note;

    onEdit(formData);
  };

  return (
    <div className={styles.card}>
      <input
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
        placeholder="Title"
      />

      <input
        value={description}
        onChange={(event) => setDescription(event.currentTarget.value)}
        placeholder="Description"
      />

      <div className={styles.cardFooter}>
        <button onClick={handleEdit}>Salvar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}
