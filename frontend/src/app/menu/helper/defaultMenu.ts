import { MenuType } from '@/types/index';

export const defaultMenu: MenuType = {
    categories: [
      {
        id: "1",
        name: "Entrantes",
        items: [
          { id: "1", description: "Ensalada César", price: 12 },
          { id: "2", description: "Bruschetta", price: 8 },
        ],
      },
      {
        id: "2",
        name: "Principales",
        items: [
          { id: "3", description: "Pizza Margherita", price: 15 },
          { id: "4", description: "Lasagna", price: 18 },
        ],
      },
      {
        id: "3",
        name: "Postres",
        items: [
          { id: "5", description: "Tiramisú", price: 7 },
          { id: "6", description: "Helado de vainilla", price: 5 },
        ],
      },
    ],
  };