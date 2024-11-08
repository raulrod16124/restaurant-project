"use client"
import { getMenu } from "@/services/api";
import { MenuItem } from "@/types";
import { useEffect, useState } from "react";

export default function Menu() {
    const [menu, setMenu] = useState<MenuItem[] | null>(null);

    useEffect(() => {
        getMenu().then(setMenu)
    },[])

    return (
        <div>
            Menu
            <pre>{JSON.stringify(menu, null, 2)}</pre>
        </div>
    );
}
