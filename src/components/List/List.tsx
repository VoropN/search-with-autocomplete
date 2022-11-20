import { memo } from 'react';
import { Table } from '@mantine/core';
import style from './style.module.scss';

interface IList {
  rows: React.ReactNode[];
  headers: Array<{ name: string; className?: string }>;
  listRef?: React.RefObject<any>;
  placeholder?: React.ReactNode;
}

export const List = memo(
  ({ headers, rows, listRef, placeholder = '' }: IList) => {
    return rows.length === 0 ? (
      <div className={style.placeholder}>{placeholder}</div>
    ) : (
      <div className={style.container} ref={listRef}>
        <Table className={style.table}>
          <thead className={style.head}>
            <tr>
              {headers.map(({ name, ...props }) => (
                <th key={name} {...props}>
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    );
  }
);
