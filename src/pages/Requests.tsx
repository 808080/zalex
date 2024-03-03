import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../mockDB/users';
import DataTable, { ColType, SortDir, TableHeader } from '../components/DataTable';
import { Request } from '../mockDB/requests';
import useRequests from '../hooks/useRequests';
import Container from '../components/Container';
import { useCallback } from 'react';
import { debounce, sortFuncs } from '../utils/functions';

const headers: TableHeader<Request>[] = [
  { label: 'Reference No.', name: 'reference_no', type: 'numeric', hasSort: false, hasFilter: true },
  { label: 'Address to', name: 'address_to', type: 'text', hasSort: false, hasFilter: true },
  { label: 'Purpose', name: 'purpose', type: 'text', hasSort: false, hasFilter: false },
  { label: 'Issued on', name: 'issued_on', type: 'date', hasSort: true, hasFilter: false },
  { label: 'Status', name: 'status', type: 'select', hasSort: true, hasFilter: true },
];

const filterFuncs: { [col in ColType]?: (requests: Request[], val: string) => void } = {
  numeric: (requests, val) => { },
  text: (requests, val) => { },
  select: (requests, val) => { },
};


const Requests = () => {
  const user = getCurrentUser();
  const { isLoading, requests } = useRequests();

  // requests.map(r => {
  //   // r.issued_on

  //   // const dateFormatted = new Intl.DateTimeFormat("en-US", {
  //   //   year: "numeric",
  //   //   month: "numeric",
  //   //   day: "numeric"
  //   // }).format(new Date(r.issued_on));

  //   // console.log(dateFormatted);
  //   console.log(new Date(r.issued_on));
  // });

  const handleSort = useCallback((col: ColType, dir: SortDir) => {
    const reqCopy = [...requests];
    sortFuncs[col]?.(reqCopy, dir);
  }, [requests]);

  const handleFilter = useCallback(debounce((col: keyof Request, val: string) => {
    const reqCopy = [...requests];
    console.log(col, val);
    // requestSortFuncs[col]?.(reqCopy, dir);
  }), [requests]);

  if (!user) return <Navigate to="/login" replace={true} />;

  return <Container $maxWidth={1024}>
    {isLoading ? 'Loading...' : <DataTable<Request> headers={headers} data={requests} onSort={handleSort} onFilter={handleFilter} />}
  </Container>;
};

export default Requests;