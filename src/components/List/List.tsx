import style from './style.module.scss';

interface IList<T> {
  list: T[];
}

export const List = <T extends { name: string; id: string; }>({ list }: IList<T>) => {
  return <ul className={style.container}>
    {list.map(({ name, id }) => <li key={id}>{name}</li>)}
  </ul>
}