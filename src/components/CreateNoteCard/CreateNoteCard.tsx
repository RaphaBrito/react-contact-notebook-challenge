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

      <div>
        <button onClick={handleCreate}>Salvar</button>
        <button onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
}
