import { memo } from "react";
import { Table } from "@mantine/core";
import style from "./style.module.scss";

interface IList {
  rows: React.ReactNode[];
  headers: { name: string; className?: string }[];
  listRef?: React.RefObject<any>;
  placeholder?: React.ReactNode;
}

export const List = memo(
  ({ headers, rows, listRef, placeholder = "" }: IList) => {
    return (
      <div className={style.container}>
        {!rows.length ? (
          <div className={style.placeholder}>{placeholder}</div>
        ) : (
          <Table className={style.table} ref={listRef}>
            <thead className={style.head}>
              {headers.map(({ name, ...props }) => (
                <th key={name} {...props}>
                  {name}
                </th>
              ))}
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        )}
      </div>
    );
  }
);
