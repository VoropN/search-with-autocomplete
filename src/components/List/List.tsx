import { Table } from "@mantine/core";
import style from "./style.module.scss";

interface IList {
  headers: { name: string; className?: string }[];
  rows: React.ReactNode[];
  placeholder?: React.ReactNode;
  listRef?: any;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

export const List = ({ headers, rows, listRef, onKeyDown, placeholder = "" }: IList) => {
  return (
    <div className={style.container} ref={listRef} tabIndex={0} onKeyDown={onKeyDown}>
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
