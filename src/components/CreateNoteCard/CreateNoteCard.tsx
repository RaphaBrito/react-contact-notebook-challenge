import { useState } from "react";

import styles from "../../styles/card.module.css";

import type { NoteFormData } from "../../types/Note";

interface CreateNoteCardInput {
  onCreate: (formData: NoteFormData) => void;
}

export function CreateNoteCard({ onCreate }: CreateNoteCardInput) {
  const [isCreating, setIsCreating] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (title.length === 0 || description.length === 0) {
      return;
    }

    const formData = { title, description } satisfies NoteFormData;

    onCreate(formData);

    setTitle("");
    setDescription("");

    setIsCreating(false);
  };

  const handleCancel = () => {
    setIsCreating(false);
  };

  if (!isCreating) {
    return <button onClick={() => setIsCreating(true)}>+</button>;
  }

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
        <button onClick={handleCreate}>Salvar</button>
        <button onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
}
