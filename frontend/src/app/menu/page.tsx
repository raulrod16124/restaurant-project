"use client"
import { getMenu } from "@/services/api";
import { MenuType } from "@/types";
import { useEffect, useState } from "react";
import { defaultMenu } from "./helper/defaultMenu";

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
