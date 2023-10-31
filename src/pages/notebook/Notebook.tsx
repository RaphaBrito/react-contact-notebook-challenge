import { useMutation, useQuery } from "@tanstack/react-query";

import AppError from "../../components/AppError/Error";
import Loading from "../../components/Loading/Loading";
import NoteCard from "../../components/NoteCard/NoteCard";
import { queryClient } from "../../services/queryClient";

import type { Note } from "../../types/Note";

import "./Notebook.css";

export default function Notebook() {
  const {
    data: notes = [],
    isFetching,
    isError,
  } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5432/notes");
      if (!response.ok) {
        throw new Error("Erro ao carregar os dados da lista de contatos");
      }

      return response.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return fetch(`http://localhost:5432/notes/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDeleteNote = (id: number) => {
    deleteMutation.mutate({ id });
    // Lógica para deleção aqui
  };

  const handleEditNote = () => {
    // Lógica para edição aqui
  };

  if (isFetching) {
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
