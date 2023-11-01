import { AppError } from "../../components/AppError/Error";
import { ContactCard } from "../../components/ContactCard/ContactCard";
import { CreateContactCard } from "../../components/CreateContactCard/CreateContactCard";
import { Loading } from "../../components/Loading/Loading";
import {
  useContacts,
  useContactsCreateMutation,
  useContactsDeleteMutation,
  useContactsEditMutation,
} from "../../hooks/contacts";
import styles from "../../styles/list.module.css";

import type { Contact, ContactFormData } from "../../types/Contact";

export function Contacts() {
  const { contacts = [], isPending, isError } = useContacts();
  const createMutation = useContactsCreateMutation();
  const editMutation = useContactsEditMutation();
  const deleteMutation = useContactsDeleteMutation();

  const handleCreate = (formData: ContactFormData) => {
    createMutation.mutate(formData);
  };

  const handleEdit = (contact: Contact) => {
    editMutation.mutate(contact);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate({ id });
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
      <div className={styles.listGrid}>
        {contacts.map((contact: Contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}

        <CreateContactCard onCreate={handleCreate} />
      </div>
    </div>
  );
}
