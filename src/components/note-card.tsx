import { useState } from "react";

import styles from "../styles/card.module.css";

import { EditNoteCard } from "./edit-card-note";

import type { Note } from "../types/Note";

interface NoteCardInput {
  note: Note;
  onEdit: (formData: Note) => void;
  onDelete: (id: number) => void;
}

export function NoteCard({ note, onDelete, onEdit }: NoteCardInput) {
  const [isEditing, setIsEditing] = useState(false);

  const handleBeginEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
  };

  const handleEdit = (formData: Note) => {
    onEdit(formData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(note.id);
  };

  if (isEditing) {
    return (
      <EditNoteCard
        note={note}
        onEdit={handleEdit}
        onCancel={handleCancelEditing}
      />
    );
  }

  return (
    <div className={styles.card}>
      <h3>{note.title}</h3>
      <p>{note.description}</p>

      <div className={styles.cardFooter}>
        <button onClick={handleBeginEditing}>Editar</button>
        <button onClick={handleDelete}>Remover</button>
      </div>
    </div>
  );
}
