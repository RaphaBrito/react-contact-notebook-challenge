export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export type ContactFormData = Omit<Contact, "id">;
