import { useState } from "react";
import "./NoteCard.css";

type NoteCardInput = {
  title: string;
  description: string;
  handleDelete: () => void;
  handleEdit: (title: string, description: string) => void;
};

export default function NoteCard({
  title,
  description,
  handleDelete,
  handleEdit,
}: NoteCardInput) {
  const [titleEdit, setTitleEdit] = useState(title);
  const [descriptionEdit, setDescriptionEdit] = useState(description);
  const [editMode, setEditMode] = useState(false);

  const handleEditTitle = (editedTitle: string) => {
    setTitleEdit(editedTitle);
  };
  const handleEditDescription = (editedDescription: string) => {
    setDescriptionEdit(editedDescription);
  };

  return (
    <div className="card">
      {!editMode ? (
        <>
          <h3>{titleEdit}</h3>
          <p>{descriptionEdit}</p>
          <div>
            <button onClick={handleDelete}>Remover</button>
            <button onClick={() => setEditMode(!editMode)}>Editar</button>
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            value={titleEdit}
            onChange={(event) => handleEditTitle(event.target.value)}
          />
          <textarea
            value={descriptionEdit}
            onChange={(event) => handleEditDescription(event.target.value)}
          />
          <div>
            <button onClick={handleDelete}>Remover</button>
            <button onClick={() => handleEdit(titleEdit, descriptionEdit)}>
              Editar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
