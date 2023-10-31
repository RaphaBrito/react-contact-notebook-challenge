import "./CreateContactCard.css";

import { useState } from "react";

import EmailIcon from "../../assets/icons/e-mail.png";
import PhoneIcon from "../../assets/icons/phone.png";
import AvatarPlaceholder from "../../assets/images/avatar.png";

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

    setName("");
    setEmail("");
    setPhone("");

    setIsCreating(false);

    onCreate(formData);
  };

  const handleCancel = () => {
    setIsCreating(false);
  };

  if (!isCreating) {
    return <button onClick={() => setIsCreating(true)}>+</button>;
  }

  return (
    <div className="card">
      <img className="card-image" src={AvatarPlaceholder} alt="avatar" />

      <h3>new name</h3>
      <input
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />

      <div className="card-contact-info">
        <img height="20px" src={PhoneIcon} alt="phone icon" />
        <p>new phone</p>
        <input
          value={phone}
          onChange={(event) => setPhone(event.currentTarget.value)}
        />
      </div>

      <div className="card-contact-info">
        <img height="20px" src={EmailIcon} alt="e-mail icon" />
        <p>new email</p>
        <input
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </div>

      <div>
        <button onClick={handleCreate}>Salvar</button>
        <button onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
}
