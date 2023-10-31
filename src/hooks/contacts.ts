import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "../services/queryClient";

import type { Contact } from "../types/Contact";

export function useContacts() {
  const {
    data: contacts,
    isPending,
    isError,
  } = useQuery<Contact[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5432/contacts");
      if (!response.ok) {
        throw new Error("Erro ao carregar os dados da lista de contatos");
      }

      return response.json();
    },
  });

  return { contacts, isPending, isError };
}

/*export function useContactsCreateMutation() {
  const mutation = useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return fetch(`http://localhost:5432/contacts/${id}`, {
        method: "POST",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  return mutation;
}*/

export function useContactsDeleteMutation() {
  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return fetch(`http://localhost:5432/contacts/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  return deleteMutation;
}
