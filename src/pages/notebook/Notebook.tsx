import AppError from "../../components/AppError/Error";
import Loading from "../../components/Loading/Loading";
import NoteCard from "../../components/NoteCard/NoteCard";
import { Note } from "../../types/Note";
import "./Notebook.css";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function Notebook() {
  const queryClient = useQueryClient();

  const {
    data: notes,
    isFetching,
    isError,
  } = useQuery("notes", async () => {
    const response = await fetch("http://localhost:3001/notes");
    if (!response.ok) {
      throw new Error("Erro ao carregar os dados da lista de notas");
    }

    return response.json();
  });

  const deleteNoteMutation = useMutation(
    async (id: number) => {
      const response = await fetch(`http://localhost:3001/notes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Falha ao deletar a nota");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("notes");
      },
    }
  );

  const handleDeleteNote = (note: Note) => {
    deleteNoteMutation.mutate(note.id);
  };

  const editContactMutation = useMutation(
    async (editedNote: Note) => {
      const response = await fetch(
        `http://localhost:3001/notes/${editedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedNote),
        }
      );
      if (!response.ok) {
        throw new Error("Falha ao editar a nota");
      }
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("notes");
      },
    }
  );

  const handleEditNote = (
    note: Note,
    newTitle: string,
    newDescription: string
  ) => {
    editContactMutation.mutate({
      ...note,
      title: newTitle,
      description: newDescription,
    });
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
            title={note.title}
            description={note.description}
            handleDelete={() => handleDeleteNote(note)}
            handleEdit={(newTitle, newDescription) =>
              handleEditNote(note, newTitle, newDescription)
            }
          />
        ))}
      </div>
    </div>
  );
}
