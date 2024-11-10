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
  const [priceError, setPriceError] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if(price < 1){
      setPriceError(true)
      setTimeout(()=>{
        setPriceError(false)
      },2000)
      return;
    }
    onSave({id: Date.now().toString(), description, price});
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
        type="number"
        value={price < 1 ? "" : price}
        onChange={(e) => {
          const newValue = e.target.value;
          if (!isNaN(Number(newValue)) && newValue !== "") {
            setPrice(Number(newValue));
          } else {
            setPrice(0);
          }
        }}
        placeholder="Precio del producto"
      />
      {priceError && (
        <span className={styles.errorText}>El precio debe ser mayor de 0</span>
      )}
      <button className={styles.saveButton} type="submit">Guardar Producto</button>
    </form>
  );
};

export default ItemForm;
