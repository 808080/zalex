import { useCallback, useRef } from 'react';
import { ID, Option } from '../../utils/types';
import { debounce } from '../../utils/functions';
import Select from '../Select';
import sanitizeHtml from 'sanitize-html';
import { TableStyled } from './styled';
import Button from '../Button';
import { setModalContent } from '../../store/actionCreators';
import Info from '../../assets/images/info-button.svg';

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
  editCondition?: (row: T) => boolean;
  onEdit?: (row: T) => void;
  isHTML?: boolean;
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

  const newCert = () => {
    setModalContent({ contentType: 'newCert' });
  };

  const infoModal = (row: T) => {
    setModalContent({ contentType: 'certInfo', data: row });
  };

  return <>
    <Button text='Request Certificate' type='button' onClick={newCert} />

    <TableStyled>
      <thead>
        <tr>
          {headers.map(header => <th key={header.name.toString()}>
            {header.hasFilter && (
              header.type === 'select' ?
                <div className='filter'>
                  <Select name={header.name.toString()} options={header.options} onChange={(val) => filter(header, val)} />
                </div> :
                <div className='filter'>
                  <input type="text" placeholder='search' onInput={(e) => filterDebounced(header, e.currentTarget.value)} />
                </div>
            )}

            {header.hasSort ? <span className='sort' onClick={() => onSortClick(header)}>{header.label} ▼</span> : header.label}
          </th>)}
        </tr>
      </thead>
      <tbody>
        {data.map(row => <tr key={`${row.id}-${row.reference_no}`}>
          {headers.map(header => <td key={`${row.id}-${header.name.toString()}`}>
            {header.isHTML ? <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(row[header.name], { allowedAttributes: { '*': ['style', 'class'] } }) }} /> : row[header.name]}

            {header.editCondition?.(row) && <button className='edit-button' onClick={() => header.onEdit?.(row)}>✎</button>}
          </td>)}
          <td className='info' onClick={() => infoModal(row)}><img src={Info} alt="info" width={20} height={20} /></td>
        </tr>)}
      </tbody>
    </TableStyled>
  </>;
};

export default DataTable;