import React from 'react'
import emptyTable from "@/assets/empty_table.png"
import waitingTable from "@/assets/waiting_table.png"
import attendedTable from "@/assets/attended_table.png"
import { Table } from '@/types'

interface IProps {
  table: Table
}

export const TableItem = ({table}: IProps) => {
  return (
    <div>
      <p>{table.id}</p>
      <p>{table.state}</p>
    </div>
  )
}
