import AppError from "../../components/AppError/Error";
import ContactCard from "../../components/ContactCard/ContactCard";
import Loading from "../../components/Loading/Loading";
import { Contact } from "../../types/Contact";
import "./Contacts.css";
import { useQuery } from "@tanstack/react-query";

export default function Contacts() {
  const {
    data: contacts,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5432/contacts");
      if (!response.ok) {
        throw new Error("Erro ao carregar os dados da lista de contatos");
      }

      return response.json();
    },
  });

  const handleDeleteContact = () => {
    // Lógica para deleção aqui
  };

  const handleEditContact = () => {
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
      <h1>Contatos</h1>
      <div className="contacts">
        {contacts.map((contact: Contact) => (
          <ContactCard
            key={contact.id}
            name={contact.name}
            email={contact.email}
            phone={contact.phone}
            handleDelete={handleDeleteContact}
            handleEdit={handleEditContact}
          />
        ))}
      </div>
    </div>
  );
}
