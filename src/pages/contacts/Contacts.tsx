import { useMutation, useQuery } from "@tanstack/react-query";

import AppError from "../../components/AppError/Error";
import ContactCard from "../../components/ContactCard/ContactCard";
import Loading from "../../components/Loading/Loading";
import { queryClient } from "../../services/queryClient";
import { Contact } from "../../types/Contact";

import "./Contacts.css";

export default function Contacts() {
  const {
    data: contacts = [],
    isFetching,
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

  const handleDeleteContact = (id: number) => {
    deleteMutation.mutate({ id });
    // Lógica para deleção aqui
  };

  const handleEditContact = () => {
    // Lógica para edição aqui
  };

  if (isFetching) {
    return <Loading />;
  }

  if (isError || deleteMutation.isError) {
    return <AppError />;
  }

  return (
    <div>
      <h1>Contatos</h1>
      <div className="contacts">
        {contacts.map((contact: Contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            handleDelete={handleDeleteContact}
            handleEdit={handleEditContact}
          />
        ))}
      </div>
    </div>
  );
}
