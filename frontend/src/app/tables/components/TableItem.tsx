import styles from "./../tables.module.css"
import React from 'react'
import emptyTable from "@/assets/empty_table.png"
import waitingTable from "@/assets/waiting_table.png"
import attendedTable from "@/assets/attended_table.png"
import { Table, TableState } from '@/types'
import Image, { StaticImageData } from 'next/image'

interface IProps {
  table: Table
}

export const TableItem = ({table}: IProps) => {
  const tableImage: Record<TableState, StaticImageData> = {
    Empty: emptyTable,
    Waiting: waitingTable,
    Attended: attendedTable
  }
  const tableText: Record<TableState, string> = {
    Empty: "Mesa libre",
    Waiting: "Mesa ocupada",
    Attended: "Mesa atendida"
  }

  return (
    <div className={styles.table}>
      <Image 
        src={tableImage[table.state]} 
        alt='table-image'
        width={150}
        height={150}
      />
      <p>{tableText[table.state]}</p>
    </div>
  )
}
