"use client"
import { MenuItem } from "@/types";
import styles from "./form.module.css"
import { useState } from 'react';

interface IProps {
    onSave: (item: MenuItem) => void;
    initialData?: MenuItem;
}

const ItemForm = ({ onSave, initialData = {id: Date.now().toString(), description: '', price: 0 } }: IProps) => {
  const [description, setDescription] = useState(initialData.description);
  const [price, setPrice] = useState(initialData.price);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onSave({id: Date.now().toString(),description, price: Number(price)});
    setDescription('');
    setPrice(0);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.inputField}
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción del producto"
      />
      <input
        className={styles.inputField}
        type="string"
        value={price < 1 ? "" : price.toString()}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Precio del producto"
      />
      <button className={styles.saveButton} type="submit">Guardar Producto</button>
    </form>
  );
};

export default ItemForm;
