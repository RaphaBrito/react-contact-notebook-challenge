import AppError from "../../components/AppError/Error";
import ContactCard from "../../components/ContactCard/ContactCard";
import Loading from "../../components/Loading/Loading";
import { Contact } from "../../types/Contact";
import { useState } from "react";
import { Link } from "react-router-dom"; // Importe o componente Link
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
        queryClient.invalidateQueries("contacts");
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

  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const createContactMutation = useMutation(
    async (newContactData: Contact) => {
      const response = await fetch("http://localhost:3001/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContactData),
      });
      if (!response.ok) {
        throw new Error("Falha ao criar o contato");
      }
      return response.json();
    },
    {
      onSuccess: () => {
        setNewContact({ name: "", email: "", phone: "" });
        queryClient.invalidateQueries("contacts");
      },
    }
  );

  const handleCreateContact = () => {
    createContactMutation.mutate(newContact);
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
      <Link to="/" className="back-button">
        Voltar
      </Link>
      <div className="contacts">
        <div className="contact-form-card">
          <div className="contact-form">
            <h2>Criar um novo contato</h2>
            <div className="form-group">
              <input
                type="text"
                placeholder="Nome"
                value={newContact.name}
                onChange={(e) =>
                  setNewContact({ ...newContact, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Email"
                value={newContact.email}
                onChange={(e) =>
                  setNewContact({ ...newContact, email: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Telefone"
                value={newContact.phone}
                onChange={(e) =>
                  setNewContact({ ...newContact, phone: e.target.value })
                }
              />
            </div>
            <button className="create-button" onClick={handleCreateContact}>
              Criar Contato
            </button>
          </div>
        </div>
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
