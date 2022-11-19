import { Table } from "@mantine/core";
import React from "react";
import style from "./style.module.scss";

interface IList {
  headers: { name: string; className?: string }[];
  rows: React.ReactNode[];
  placeholder?: React.ReactNode;
}

export const List = ({ headers, rows, placeholder = "" }: IList) => {
  return (
    <div className={style.container}>
      {!rows.length ? (
        <div className={style.placeholder}>{placeholder}</div>
      ) : (
        <Table className={style.table}>
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
};
