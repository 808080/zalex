import { useCallback, useRef } from 'react';
import { ID, Option } from '../../utils/types';
import { debounce } from '../../utils/functions';
import Select from '../Select';

type Row = {
  id: ID,
  [prop: string]: any
};

export type Filter<T extends Row> = { [colName in keyof T]?: { val: string, type: ColType } };

export type SortDir = 'asc' | 'desc';
export type ColType = 'date' | 'text' | 'select' | 'numeric';

export type TableHeader<T extends Row> = {
  name: keyof T;
  label: string;
  hasSort: boolean;
  hasFilter: boolean;
} & ({
  type: 'select';
  options: Option[];
} | {
  type: 'date' | 'text' | 'numeric';
});

type Props<T extends Row> = {
  headers: TableHeader<T>[];
  data: T[],
  onSort: (name: TableHeader<T>, dir: SortDir) => void;
  onFilter: (filter: Filter<T>) => void;
};

const DataTable = <T extends Row>({ headers, data, onSort, onFilter }: Props<T>) => {
  const sortRef = useRef<{ col: keyof T, dir: SortDir }>({ col: '', dir: 'desc' });
  const filterRef = useRef<Filter<T>>({});

  const onSortClick = (col: TableHeader<T>) => {
    if (sortRef.current.col === col.name) {
      sortRef.current.dir = sortRef.current.dir === 'asc' ? 'desc' : 'asc';
    } else {
      sortRef.current.dir = 'desc';
    }

    sortRef.current.col = col.name;
    onSort(col, sortRef.current.dir);
  };

  const filter = useCallback((col: TableHeader<T>, val: string) => {
    filterRef.current[col.name] = { val, type: col.type };
    onFilter(filterRef.current);
  }, []);
  const filterDebounced = debounce(filter);

  return <table>
    <thead>
      <tr>
        {headers.map(header => <th key={header.name.toString()}>
          {header.hasFilter && (
            header.type === 'select' ? <Select name={header.name.toString()} options={header.options} onChange={(val) => filter(header, val)} /> :
              <div>
                <input type="text" onInput={(e) => filterDebounced(header, e.currentTarget.value)} />
              </div>
          )}
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