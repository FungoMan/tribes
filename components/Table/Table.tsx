import { useCallback } from "react"

import styles from "./Table.module.scss"

type IRecord = { [key: string]: string | number | null }

export interface CellProps {
  column: IColumn
  record: IRecord
  index: number
}

export interface IColumn {
  key: string
  title: string
  width?: string | number
  textAlign?: "left" | "right" | "center"
  verticalAlign?: "baseline" | "middle" | "top" | "bottom"
  dataValue?: string | number
  render?: Function
  onClick?: () => void
}

export interface TableProps {
  columns: IColumn[]
  data: any[]
  className?: string
  height?: string | number
  loading?: boolean
}

const Table = (props: TableProps) => {
  const { columns, data, className, height, loading } = props
  const getKeys = (record: IRecord) => Object.keys(record) || []

  const ColumnHeader = useCallback(({ column }: { column: IColumn }) => {
    const title = column.title
    const textAlign = column.textAlign || "left"
    const verticalAlign = column.verticalAlign || "middle"
    const onClick = column.onClick

    return (
      <th className="" style={{ textAlign, verticalAlign }} onClick={onClick}>
        <span>{title}</span>
      </th>
    )
  }, [])

  const Cell = useCallback((props: CellProps) => {
    const { column, record, index } = props
    const { textAlign = "left", verticalAlign = "middle" } = column

    return (
      <td className={styles["cell"]} style={{ textAlign, verticalAlign }}>
        {!!column.render && column.render(record, index)}
        {!!column.dataValue && !column.render && record[column.dataValue]?.toString()}
      </td>
    )
  }, [])

  return (
    <>
      {loading ? (
        <div className={styles["table-loading"]}>
          <div>Loading</div>
        </div>
      ) : (
        <div className={`${styles["table"]} ${className}`} style={{ height }}>
          <>
            <table>
              <colgroup>
                {columns?.map((column) => (
                  <col key={`colgroup-${column.key}`} style={{ width: column.width }} />
                ))}
              </colgroup>
              <thead className={styles["head"]}>
                <tr>
                  {columns?.map((column) => (
                    <ColumnHeader key={`column_${column.key}`} column={column} />
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) &&
                  data.map((record, index) => (
                    <tr
                      key={`${index}`}
                      className={`${styles["row"]} ${index % 2 === 0 && "row-dark"}`}
                    >
                      {columns?.map((column) => (
                        <Cell
                          key={column.key + record[getKeys(record)[0]]}
                          column={column}
                          record={record}
                          index={index}
                        />
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
            {(!Array.isArray(data) || !data.length) && (
              <div className={styles["no-data"]}>
                <p className="mute">No data</p>
              </div>
            )}
          </>
        </div>
      )}
    </>
  )
}

export default Table
