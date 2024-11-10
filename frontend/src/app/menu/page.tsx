"use client"
import styles from "./menu.module.css"
import { Category, MenuItem, MenuType } from "@/types";
import { useEffect, useState } from "react";
import { createCategoryAction, createMenuItem, deleteCategoryAction, deleteMenuItem, getMenuAction, updateCategoryAction } from "@/services/menu";
import ItemForm from "./components/ItemForm";
import CategoryForm from "./components/CategoryForm";
import { FaTrash } from 'react-icons/fa';
import { FaPencil } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export default function Menu() {
    const [data, setData] = useState<MenuType>();
    const [editingCategory, setEditingCategory] = useState<Category>();
    const [editingItem, setEditingItem] = useState<{item: MenuItem, categoryId: string}>();
    const [showAddItem, setShowAddItem] = useState<string | undefined>();
    const [showAddCategory, setShowAddCategory] = useState<boolean>(false);
    
    useEffect(() => {
        getMenu()
    },[])

    const getMenu = async () => {
        await getMenuAction().then( menu => setData(menu))
    }

    if(!data){
        return (
            <div className={styles.menuContainer}>
                <h1 className={styles.menuTitle}>Menu</h1>
                <div className={styles.categoryCard}>Loading...</div>
            </div>
        )
    }

    const addCategory = async (name: string) => {
        const createdCategory = await createCategoryAction(name);
        if (createdCategory) {
          console.log('Category created successfully');
          getMenu()
          setShowAddCategory(false)
        } else {
          console.error('Error creating category');
        }
    };

    const addItem = async (categoryId: string, newItem: MenuItem) => {
        const { description, price} = newItem;
        const createdItem = await createMenuItem({
            description,
            price,
            categoryId
        })
        if (createdItem) {
          console.log('Item created successfully');
          getMenu()
        } else {
          console.error('Error creating item');
        }
    };

    const editCategory = async (categoryId: string, newName: string) => {
        const updatedCategory = await updateCategoryAction({
            id: categoryId,
            name: newName
        })
        if (updatedCategory) {
          console.log('Category updated successfully');
          getMenu()
        } else {
          console.error('Error updating category');
        }
    };

    const editItem = (categoryId: string, itemId: string, newDescription: string, newPrice: number) => {
        const updatedCategories = data.categories.map(category => {
            if (category.id === categoryId) {
                const updatedItems = category.items?.map(item =>
                    item.id === itemId ? { ...item, description: newDescription, price: newPrice } : item
                );
                return { ...category, items: updatedItems };
            }
            return category;
        });
        setData({ ...data, categories: updatedCategories });
    };

    const deleteCategory = async (categoryId: string) => {
        const deletedCategory = await deleteCategoryAction(categoryId)
        if (deletedCategory) {
          console.log('Category deleted successfully');
          getMenu()
        } else {
          console.error('Error deleting category');
        }
    };

    const deleteItem = async (itemId: string) => {
        const deletedMenuItem = await deleteMenuItem(itemId)
        if (deletedMenuItem) {
          console.log('Item deleted successfully');
          getMenu()
        } else {
          console.error('Error deleting item');
        }
    };

    return (
        <div className={styles.menuContainer}>
            <h1 className={styles.menuTitle}>Menu</h1>
            <div className={styles.categoryCard}>
                {!data.categories.length && (
                    <div className={styles.categoryHeader}>
                        <p className={styles.itemDescription}>No existe ninguna categoria aún</p>
                    </div>
                )}
                {data.categories.map((category) => (
                    <div key={category.id}>
                        <div className={styles.categoryHeader}>
                            <h2 className={styles.categoryName}>{category.name}</h2>
                            <div className={styles.buttonContainer}>
                                <button 
                                    className={styles.button} 
                                    onClick={() => deleteCategory(category.id)}
                                >
                                    <FaTrash size={15} color="red" />
                                </button>
                                <button 
                                    className={styles.button} 
                                    onClick={() => setEditingCategory(
                                        editingCategory?.name === category.name ? undefined :category
                                    )}
                                >
                                    {editingCategory?.name === category.name 
                                        ? <IoClose size={15} color="black" /> 
                                        : <FaPencil size={15} color="green" />
                                    }
                                </button>
                            </div>
                        </div>
                        {editingCategory?.name === category.name && (
                            <CategoryForm
                                initialData={editingCategory.name}
                                onSave={(newName) => {
                                    editCategory(editingCategory.id, newName);
                                    setEditingCategory(undefined);
                                }}
                            />
                        )}
                        {!category.items?.length && (
                            <div className={styles.itemCard}>
                                <p className={styles.itemDescription}>Esta categoria no tiene productos aún</p>
                            </div>
                        )}
                        {category.items?.map((item) => (
                            <div key={item.id}>
                                <div className={styles.itemCard}>
                                    <p className={styles.itemDescription}>{item.description} - {item.price}€</p>
                                    <div className={styles.buttonContainer}>
                                        <button 
                                            className={styles.button} 
                                            onClick={() => deleteItem(item.id)}
                                        >
                                            <FaTrash size={15} color="red" />
                                        </button>
                                        <button 
                                            className={styles.button} 
                                            onClick={() => setEditingItem(
                                                editingItem?.item.id === item.id ? undefined : { item, categoryId: category.id }
                                            )}
                                        >
                                            {editingItem?.item.id === item.id
                                                ? <IoClose size={15} color="black" /> 
                                                : <FaPencil size={15} color="green" />
                                            }
                                        </button>
                                    </div>
                                </div>
                                {editingItem?.item.id === item.id && (
                                    <ItemForm
                                        initialData={editingItem.item}
                                        onSave={(item) => {
                                            editItem(editingItem.categoryId, editingItem.item.id, item.description, item.price);
                                            setEditingItem(undefined);
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                        <div className={styles.buttonContainer}>
                            <button
                                className={styles.button}
                                type="button"
                                onClick={() => setShowAddItem(
                                    showAddItem ? undefined : category.id
                                )}
                            >
                                {showAddItem === category.id ? "Ocultar formulario" : `Añadir producto a ${category.name}`}
                            </button>
                        </div>
                        {showAddItem === category.id && (
                            <ItemForm onSave={(newItem : MenuItem) => addItem(category.id, newItem)} />
                        )}
                    </div>
                ))}
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        type="button"
                        onClick={() => setShowAddCategory(!showAddCategory)}
                    >
                        {showAddCategory ? "Ocultar formulario" : "Añadir nueva categoría"}
                    </button>
                </div>
                {showAddCategory && <CategoryForm onSave={addCategory} />}
            </div>
        </div>
    );
}
