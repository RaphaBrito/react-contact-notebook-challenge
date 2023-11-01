import PhoneIcon from "../../assets/icons/phone.png";
import EmailIcon from "../../assets/icons/e-mail.png";
import AvatarPlaceholder from "../../assets/images/avatar.png";
import "./ContactCard.css";
import { useState } from "react";

type ContactCardInput = {
  name: string;
  email: string;
  phone: string;
  handleDelete: () => void;
  handleEdit: (name: string, email: string, phone: string) => void;
};

export default function ContactCard({
  name,
  email,
  phone,
  handleDelete,
  handleEdit,
}: ContactCardInput) {
  const [nameEdit, setNameEdit] = useState(name);
  const [emailEdit, setEmailEdit] = useState(email);
  const [phoneEdit, setPhoneEdit] = useState(phone);
  const [editMode, setEditMode] = useState(false);

  const handleEditName = (editedName: string) => {
    setNameEdit(editedName);
  };
  const handleEditEmail = (editedEmail: string) => {
    setEmailEdit(editedEmail);
  };
  const handleEditPhone = (editedPhone: string) => {
    setPhoneEdit(editedPhone);
  };

  return (
    <div className="card">
      {!editMode ? (
        <>
          <img className="card-image" src={AvatarPlaceholder} alt="avatar" />
          <h3>{nameEdit}</h3>
          <div className="card-contact-info">
            <img height="20px" src={PhoneIcon} alt="phone icon" />
            <p>{phoneEdit}</p>
          </div>
          <div className="card-contact-info">
            <img height="20px" src={EmailIcon} alt="e-mail icon" />
            <p>{emailEdit}</p>
          </div>
          <div>
            <button onClick={handleDelete}>Remover</button>
            <button onClick={() => setEditMode(!editMode)}>Editar</button>
          </div>
        </>
      ) : (
        <>
          <img className="card-image" src={AvatarPlaceholder} alt="avatar" />
          <input
            type="text"
            value={nameEdit}
            onChange={(event) => handleEditName(event.target.value)}
          />
          <div className="card-contact-info">
            <img height="20px" src={PhoneIcon} alt="phone icon" />
            <input
              type="text"
              value={phoneEdit}
              onChange={(event) => handleEditPhone(event.target.value)}
            />
          </div>
          <div className="card-contact-info">
            <img height="20px" src={EmailIcon} alt="e-mail icon" />
            <input
              type="email"
              value={emailEdit}
              onChange={(event) => handleEditEmail(event.target.value)}
            />
          </div>
          <div>
            <button onClick={handleDelete}>Remover</button>
            <button onClick={() => handleEdit(nameEdit, emailEdit, phoneEdit)}>
              Editar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
