import { useState } from "react";

import EmailIcon from "../../assets/icons/e-mail.png";
import PhoneIcon from "../../assets/icons/phone.png";
import AvatarPlaceholder from "../../assets/images/avatar.png";
import styles from "../../styles/card.module.css";
import { EditContactCard } from "../EditContactCard/EditContactCard";

import type { Contact } from "../../types/Contact";

interface ContactCardInput {
  contact: Contact;
  onEdit: (formData: Contact) => void;
  onDelete: (id: number) => void;
}

export function ContactCard({ contact, onDelete, onEdit }: ContactCardInput) {
  const [isEditing, setIsEditing] = useState(false);

  const handleBeginEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
  };

  const handleEdit = (formData: Contact) => {
    onEdit(formData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(contact.id);
  };

  if (isEditing) {
    return (
      <EditContactCard
        contact={contact}
        onEdit={handleEdit}
        onCancel={handleCancelEditing}
      />
    );
  }

  return (
    <div className={styles.card}>
      <img className={styles.cardImage} src={AvatarPlaceholder} alt="avatar" />

      <h3>{contact.name}</h3>

      <div className={styles.cardContactInfo}>
        <img height="20px" src={PhoneIcon} alt="phone icon" />
        <p>{contact.phone}</p>
      </div>

      <div className={styles.cardContactInfo}>
        <img height="20px" src={EmailIcon} alt="e-mail icon" />
        <p>{contact.email}</p>
      </div>

      <div className={styles.cardFooter}>
        <button onClick={handleBeginEditing}>Editar</button>
        <button onClick={handleDelete}>Remover</button>
      </div>
    </div>
  );
}
