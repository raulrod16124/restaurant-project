"use client"
import styles from "./form.module.css"
import { useState } from 'react';

interface IProps {
    onSave: (name: string) => void;
    initialData?: string;
}

const CategoryForm = ({ onSave, initialData = '' }: IProps) => {
  const [name, setName] = useState(initialData);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onSave(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.inputField}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre de la categoría"
      />
      <button className={styles.saveButton} type="submit">Guardar Categoría</button>
    </form>
  );
};

export default CategoryForm;
