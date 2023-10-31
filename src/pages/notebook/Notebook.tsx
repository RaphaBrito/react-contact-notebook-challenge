import "./Notebook.css";

import { AppError } from "../../components/AppError/Error";
import { Loading } from "../../components/Loading/Loading";
import { NoteCard } from "../../components/NoteCard/NoteCard";
import { useNotes, useNotesDeleteMutation } from "../../hooks/notes";

import type { Note } from "../../types/Note";

export function Notebook() {
  const { notes = [], isPending, isError } = useNotes();
  const deleteMutation = useNotesDeleteMutation();

  const handleDeleteNote = (id: number) => {
    deleteMutation.mutate({ id });
    // Lógica para deleção aqui
  };

  const handleEditNote = () => {
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
            handleDelete={handleDeleteNote}
            handleEdit={handleEditNote}
          />
        ))}
      </div>
    </div>
  );
}
