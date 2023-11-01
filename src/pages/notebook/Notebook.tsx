import { AppError } from "../../components/AppError/Error";
import { CreateNoteCard } from "../../components/CreateNoteCard/CreateNoteCard";
import { Loading } from "../../components/Loading/Loading";
import { NoteCard } from "../../components/NoteCard/NoteCard";
import {
  useNotes,
  useNotesCreateMutation,
  useNotesDeleteMutation,
  useNotesEditMutation,
} from "../../hooks/notes";
import styles from "../../styles/list.module.css";

import type { Note, NoteFormData } from "../../types/Note";

export function Notebook() {
  const { notes = [], isPending, isError } = useNotes();
  const createMutation = useNotesCreateMutation();
  const editMutation = useNotesEditMutation();
  const deleteMutation = useNotesDeleteMutation();

  const handleCreate = (formData: NoteFormData) => {
    createMutation.mutate(formData);
  };

  const handleEdit = (note: Note) => {
    editMutation.mutate(note);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate({ id });
  };

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <AppError />;
  }

  return (
    <div>
      <h1>Bloco de notas</h1>
      <div className={styles.listGrid}>
        {notes.map((note: Note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}

        <CreateNoteCard onCreate={handleCreate} />
      </div>
    </div>
  );
}
