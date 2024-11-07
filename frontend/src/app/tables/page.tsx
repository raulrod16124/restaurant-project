"use client"

import { getTables } from "@/services/api";
import { useEffect, useState } from "react";

export default function Tables() {
    const [tables, setTables] = useState<any[] | null>(null);

    useEffect(() => {
        getTables().then(setTables)
    },[])

    return (
      <div>
          Tables
          <pre>{JSON.stringify(tables, null, 2)}</pre>
      </div>
    );
  }
  