"use client"

import styles from "./tables.module.css"
import { Table } from "@/types";
import { useEffect, useState } from "react";
import { TableItem } from "./components/TableItem";
import Link from "next/link";
import { getTables } from "@/services/tables";

export default function Tables() {
    const [tables, setTables] = useState<Table[]>([]);

    useEffect(() => {
      getTables().then(setTables)
    },[])

    return (
      <div>
        <Link href="/" className={styles.backLink}>{"<"}</Link>
          <h1 className={styles.tablesTitle}>Mapa de las mesas:</h1>
          <div className={styles.tablesContainer}>
            {tables?.map( table => (
                <TableItem key={table.id} table={table} />
            ))}
          </div>
      </div>
    );
  }
  