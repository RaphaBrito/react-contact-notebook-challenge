import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "../services/queryClient";

import type { Note, NoteFormData } from "../types/note";

export function useNotes() {
  const {
    data: notes,
    isPending,
    isError,
  } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5432/notes");
      if (!response.ok) {
        throw new Error("Erro ao carregar os dados da lista de notas");
      }

      return response.json();
    },
  });

  return { notes, isPending, isError };
}

export function useNotesCreateMutation() {
  const mutation = useMutation({
    mutationFn: (formData: NoteFormData) => {
      return fetch(`http://localhost:5432/notes`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return mutation;
}

export function useNotesEditMutation() {
  const mutation = useMutation({
    mutationFn: (note: Note) => {
      return fetch(`http://localhost:5432/notes/${note.id}`, {
        method: "PUT",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return mutation;
}

export function useNotesDeleteMutation() {
  const mutation = useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return fetch(`http://localhost:5432/notes/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return mutation;
}
