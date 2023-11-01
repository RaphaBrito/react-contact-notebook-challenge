import { useState } from "react";

import styles from "../styles/card.module.css";

import type { Contact } from "../types/Contact";

interface EditContactCardInput {
  contact: Contact;
  onEdit: (formData: Contact) => void;
  onCancel: () => void;
}

export function EditContactCard({
  contact,
  onEdit,
  onCancel,
}: EditContactCardInput) {
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phone);

  const handleEdit = () => {
    if (name.length === 0 || email.length === 0 || phone.length === 0) {
      return;
    }

    const formData = { id: contact.id, name, email, phone } satisfies Contact;

    onEdit(formData);
  };

  return (
    <div className={styles.card}>
      <input
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        placeholder="Name"
      />

      <input
        value={phone}
        onChange={(event) => setPhone(event.currentTarget.value)}
        placeholder="Phone"
      />

      <input
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
        placeholder="Email"
      />

      <div className={styles.cardFooter}>
        <button onClick={handleEdit}>Salvar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}
