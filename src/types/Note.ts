export interface Note {
  id: number;
  title: string;
  description: string;
}

export type NoteFormData = Omit<Note, "id">;
