import "./../tables.css"
import React from 'react'
import emptyTable from "@/assets/empty_table.png"
import waitingTable from "@/assets/waiting_table.png"
import attendedTable from "@/assets/attended_table.png"
import { Table } from '@/types'
import Image, { StaticImageData } from 'next/image'

interface IProps {
  table: Table
}

export const TableItem = ({table}: IProps) => {
  const tableImage: Record<string, StaticImageData> = {
    empty: emptyTable,
    waiting: waitingTable,
    attended: attendedTable
  }
  const tableText: Record<string, string> = {
    empty: "Mesa libre",
    waiting: "Mesa ocupada",
    attended: "Mesa atendida"
  }

  return (
    <div className="table">
      <Image 
        src={tableImage[table.state.toLowerCase()]} 
        alt='table-image'
        width={180}
        height={180}
      />
      <p>{tableText[table.state.toLowerCase()]}</p>
    </div>
  )
}
