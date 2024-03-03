import { useRef } from 'react';
import { ID } from '../../utils/types';

type Row = {
  id: ID,
  [prop: string]: any
};

export type SortDir = 'asc' | 'desc';
export type ColType = 'date' | 'text' | 'select' | 'numeric';

export type TableHeader<T extends Row> = {
  name: keyof T;
  label: string;
  type: ColType;
  hasSort: boolean;
  hasFilter: boolean;
};

type Props<T extends Row> = {
  headers: TableHeader<T>[];
  data: T[],
  onSort: (name: ColType, dir: SortDir) => void;
  onFilter: (name: keyof T, value: string) => void;
};

const DataTable = <T extends Row>({ headers, data, onSort, onFilter }: Props<T>) => {
  const sortRef = useRef<{ col: keyof T, dir: SortDir }>({ col: '', dir: 'desc' });

  const onSortClick = (col: TableHeader<T>) => {
    if (sortRef.current.col === col.name) {
      sortRef.current.dir = sortRef.current.dir === 'asc' ? 'desc' : 'asc';
    } else {
      sortRef.current.dir = 'desc';
    }

    sortRef.current.col = col.name;
    onSort(col.type, sortRef.current.dir);
  };

  const onFilterInput = (col: keyof T, val: string) => {
    onFilter(col, val);
  };

  return <table>
    <thead>
      <tr>
        {headers.map(header => <th key={header.name.toString()}>
          {header.hasFilter && <div>
            <input type="text" onInput={(e) => onFilterInput(header.name, e.currentTarget.value)} />
          </div>}
          {header.label}
          {header.hasSort && <span onClick={() => onSortClick(header)}>sort</span>}
        </th>)}
      </tr>
    </thead>
    <tbody>
      {data.map(row => <tr key={row.id}>{headers.map(header => <td key={`${row.id}-${header.name.toString()}`}>{row[header.name]}</td>)}</tr>)}
    </tbody>
  </table >;
};

export default DataTable;