export interface Field {
    id: string;
    type: string;
    label: string;
    required?: boolean;
    placeholder?: string;
    options?: { value: string; label: string }[];
    validation?: {
      pattern?: string,
      message?: string,
      min?: number,
      max?: number,
      minLength?: number,
      maxLength?: number
    } 
  }
  
  export interface Schema {
    formTitle: string;
    formDescription: string;
    fields: Field[];
  }
  