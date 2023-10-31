import { useState } from "react";

import styles from "../../styles/note-card.module.css";

import type { NoteFormData } from "../../types/Note";

interface CreateNoteCardInput {
  isMutating: boolean;
  onCreate: (formData: NoteFormData) => void;
}

export function CreateNoteCard({ isMutating, onCreate }: CreateNoteCardInput) {
  const [isCreating, setIsCreating] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (title.length === 0 || description.length === 0) {
      return;
    }

    const formData = { title, description } satisfies NoteFormData;

    setTitle("");
    setDescription("");
    setIsCreating(false);

    onCreate(formData);
  };

  const handleCancel = () => {
    setIsCreating(false);
  };

  if (!isCreating) {
    return <button onClick={() => setIsCreating(true)}>+</button>;
  }

  return (
    <div className={styles.card}>
      <h3>new title</h3>
      <input
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
      />

      <p>new description</p>
      <input
        value={description}
        onChange={(event) => setDescription(event.currentTarget.value)}
      />

      <div>
        <button onClick={handleCreate}>Salvar</button>
        <button onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
}
