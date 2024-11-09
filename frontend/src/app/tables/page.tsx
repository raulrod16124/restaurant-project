"use client"

import "./tables.css"
import { getTables } from "@/services/api";
import { Table } from "@/types";
import { useEffect, useState } from "react";
import { TableItem } from "./components/TableItem";
import Link from "next/link";

export default function Tables() {
    const [tables, setTables] = useState<Table[] | null>(null);

    useEffect(() => {
        getTables().then(setTables)
    },[])

    return (
      <div>
        <Link href="/" className="back-link">{"<"}</Link>
          <h2 className="table-title">Mapa de las mesas:</h2>
          <div className="tables-container">
            {tables?.map( table => (
                <TableItem key={table.id} table={table} />
            ))}
          </div>
      </div>
    );
  }
  