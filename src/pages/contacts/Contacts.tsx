import { AppError } from "../../components/AppError/Error";
import { ContactCard } from "../../components/ContactCard/ContactCard";
import { Loading } from "../../components/Loading/Loading";
import { useContacts, useContactsDeleteMutation } from "../../hooks/contacts";

import type { Contact } from "../../types/Contact";

import "./Contacts.css";

export function Contacts() {
  const { contacts = [], isPending, isError } = useContacts();
  const deleteMutation = useContactsDeleteMutation();

  const handleDeleteContact = (id: number) => {
    deleteMutation.mutate({ id });
    // Lógica para deleção aqui
  };

  const handleEditContact = () => {
    // Lógica para edição aqui
  };

  if (isPending) {
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
