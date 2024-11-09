"use client"
import { MenuType } from "@/types";
import { useEffect, useState } from "react";
import { defaultMenu } from "./helper/defaultMenu";
import { getMenu } from "@/services/menu";

export default function Menu() {
    const [menu, setMenu] = useState<MenuType | null>(null);

    useEffect(() => {
        getMenu().then( menu => {
            if(!menu.categories.length){
                return setMenu(defaultMenu)
            }
            setMenu(menu)
        })
    },[])

    return (
        <div>
            Menu
            <pre>{JSON.stringify(menu, null, 2)}</pre>
        </div>
    );
}
