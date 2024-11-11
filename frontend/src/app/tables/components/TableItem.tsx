"use client"
import styles from "./../tables.module.css"
import React, { useEffect, useState } from 'react'
import emptyTable from "@/assets/empty_table.png"
import waitingTable from "@/assets/waiting_table.png"
import attendedTable from "@/assets/attended_table.png"
import { Table, TableRequestItem, TableState } from '@/types'
import Image, { StaticImageData } from 'next/image'
import { getTableRequestAction } from "@/services/tables"

interface IProps {
  table: Table
}

export const TableItem = ({table}: IProps) => {
  const [tableRequest, setTableRequest] = useState<TableRequestItem[]>();
  const [tableRequestTotalPrice, setTableRequestTotalPrice] = useState<number>();

  useEffect(() => {
    getTableRequest()
  }, [table])

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

  const getTableRequest = async () => {
    const tableRequest = await getTableRequestAction(table.id) || [];
    setTableRequest(tableRequest)
    const totalPrice = tableRequest.reduce((acc: number, cur: TableRequestItem) => acc + cur.price, 0);
    setTableRequestTotalPrice(totalPrice)
  }

  return (
    <div className={styles.tooltip}>
      <div className={styles.table}>
        <Image 
          src={tableImage[table.state]} 
          alt='table-image'
          width={100}
          height={100}
        />
        <p>{tableText[table.state]}</p>
      </div>
      <div className={styles.tooltipInfo}>
        {tableRequest && tableRequest.length > 0 && tableRequest.map( (request, index) => {
          return (
            <div className={styles.tooltipInfoWrapper} key={request.description + index}>
              <p>{request.description}:</p>
              <p>{request.price}€</p>
            </div>
          )
        })}
        {tableRequest && tableRequest.length > 0 && tableRequestTotalPrice && (
          <div className={styles.totalPriceContainer}>
            <p>Precio total:</p>
            <p>{tableRequestTotalPrice}€</p>
          </div>
        )}
        {!tableRequest?.length && (
          <div>No hay pedidos</div>
        )}
      </div>
    </div>
  )
}
