import "./ContactCard.css";

import EmailIcon from "../../assets/icons/e-mail.png";
import PhoneIcon from "../../assets/icons/phone.png";
import AvatarPlaceholder from "../../assets/images/avatar.png";

import type { Contact } from "../../types/Contact";

interface ContactCardInput {
  contact: Contact;
  isMutating: boolean;
  onDelete: (id: number) => void;
  onEdit: () => void;
}

export function ContactCard({
  contact,
  isMutating,
  onDelete,
  onEdit,
}: ContactCardInput) {
  return (
    <div className="card">
      <img className="card-image" src={AvatarPlaceholder} alt="avatar" />

      <h3>{contact.name}</h3>

      <div className="card-contact-info">
        <img height="20px" src={PhoneIcon} alt="phone icon" />
        <p>{contact.phone}</p>
      </div>

      <div className="card-contact-info">
        <img height="20px" src={EmailIcon} alt="e-mail icon" />
        <p>{contact.email}</p>
      </div>

      <div>
        <button onClick={() => onDelete(contact.id)}>Remover</button>
        <button onClick={onEdit}>Editar</button>
      </div>
    </div>
  );
}
