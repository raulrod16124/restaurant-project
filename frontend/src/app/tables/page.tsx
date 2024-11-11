"use client"
import styles from "./tables.module.css"
import { Table } from "@/types";
import { useEffect, useState } from "react";
import { TableItem } from "./components/TableItem";
import Link from "next/link";
import { getTablesAction } from "@/services/tables";

export default function Tables() {
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    getTablesAction().then(setTables)
  },[])

  return (
    <div>
      <h1 className={styles.tablesTitle}>Mapa de las mesas:</h1>
      <div className={styles.tablesContainer}>
        {tables?.map( table => (
          <TableItem key={table.id} table={table} />
        ))}
      </div>
    </div>
  );
}
  