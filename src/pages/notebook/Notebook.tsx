import "./Notebook.css";

import { AppError } from "../../components/AppError/Error";
import { CreateNoteCard } from "../../components/CreateNoteCard/CreateNoteCard";
import { Loading } from "../../components/Loading/Loading";
import { NoteCard } from "../../components/NoteCard/NoteCard";
import {
  useNotes,
  useNotesCreateMutation,
  useNotesDeleteMutation,
} from "../../hooks/notes";

import type { Note, NoteFormData } from "../../types/Note";

export function Notebook() {
  const { notes = [], isPending, isError } = useNotes();
  const createMutation = useNotesCreateMutation();
  const deleteMutation = useNotesDeleteMutation();

  const handleCreate = (formData: NoteFormData) => {
    createMutation.mutate(formData);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate({ id });
    // Lógica para deleção aqui
  };

  const handleEdit = () => {
    // Lógica para edição aqui
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
      <div className="notebook">
        {notes.map((note: Note) => (
          <NoteCard
            key={note.id}
            note={note}
            isMutating={deleteMutation.isPending}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}

        <CreateNoteCard isMutating={false} onCreate={handleCreate} />
      </div>
    </div>
  );
}
