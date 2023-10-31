import { useState } from "react";

import styles from "../../styles/contact-card.module.css";

import type { ContactFormData } from "../../types/Contact";

interface CreateContactCardInput {
  isMutating: boolean;
  onCreate: (formData: ContactFormData) => void;
}

export function CreateContactCard({
  isMutating,
  onCreate,
}: CreateContactCardInput) {
  const [isCreating, setIsCreating] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleCreate = () => {
    if (name.length === 0 || email.length === 0 || phone.length === 0) {
      return;
    }

    const formData = { name, email, phone } satisfies ContactFormData;

    onCreate(formData);

    setIsCreating(false);

    setName("");
    setEmail("");
    setPhone("");
  };

  const handleCancel = () => {
    setIsCreating(false);
  };

  if (!isCreating) {
    return <button onClick={() => setIsCreating(true)}>+</button>;
  }

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

      <div>
        <button onClick={handleCreate}>Salvar</button>
        <button onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
}
