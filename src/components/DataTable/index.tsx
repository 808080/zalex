import { ID } from '../../utils/types';

type Row = {
  id: ID,
  [prop: string]: any
};

type Props<T extends Row> = {
  headers: {
    name: keyof T;
    label: string;
  }[];
  data: T[]
}

const DataTable = <T extends Row>({ headers, data }: Props<T>) => {
  return <table>
    <thead>
      <tr>
        {headers.map(header => <th key={header.name.toString()}>{header.label}</th>)}
      </tr>
    </thead>
    <tbody>
      {data.map(row => <tr key={row.id}>{headers.map(header => <td key={`${row.id}-${header.name.toString()}`}>{row[header.name]}</td>)}</tr>)}
    </tbody>
  </table>;
};

export default DataTable;