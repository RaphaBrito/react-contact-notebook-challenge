import AppError from "../../components/AppError/Error";
import ContactCard from "../../components/ContactCard/ContactCard";
import Loading from "../../components/Loading/Loading";
import { Contact } from "../../types/Contact";
import "./Contacts.css";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function Contacts() {
  const queryClient = useQueryClient();

  const {
    data: contacts,
    isFetching,
    isError,
  } = useQuery("contacts", async () => {
    const response = await fetch("http://localhost:3001/contacts");
    if (!response.ok) {
      throw new Error("Erro ao carregar os dados da lista de contatos");
    }

    return response.json();
  });

  const deleteContactMutation = useMutation(
    async (id: number) => {
      const response = await fetch(`http://localhost:3001/contacts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Falha ao deletar o contato");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("contacts");
      },
    }
  );

  const handleDeleteContact = (contact: Contact) => {
    deleteContactMutation.mutate(contact.id);
  };

  const editContactMutation = useMutation(
    async (editedContact: Contact) => {
      const response = await fetch(
        `http://localhost:3001/contacts/${editedContact.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedContact),
        }
      );
      if (!response.ok) {
        throw new Error("Falha ao editar o contato");
      }
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("contacts"); // Invalida a query de tarefas para atualizar a lista
      },
    }
  );

  const handleEditContact = (
    contact: Contact,
    newName: string,
    newEmail: string,
    newPhone: string
  ) => {
    editContactMutation.mutate({
      ...contact,
      name: newName,
      email: newEmail,
      phone: newPhone,
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
      <h1>Contatos</h1>
      <div className="contacts">
        {contacts.map((contact: Contact) => (
          <ContactCard
            key={contact.id}
            name={contact.name}
            email={contact.email}
            phone={contact.phone}
            handleDelete={() => handleDeleteContact(contact)}
            handleEdit={(newName, newEmail, newPhone) =>
              handleEditContact(contact, newName, newEmail, newPhone)
            }
          />
        ))}
      </div>
    </div>
  );
}
