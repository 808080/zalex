import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../mockDB/users';
import DataTable, { Filter, SortDir, TableHeader } from '../components/DataTable';
import { Request } from '../mockDB/requests';
import useRequests from '../hooks/useRequests';
import Container from '../components/Container';
import { useCallback } from 'react';
import { filterFuncs, sortFuncs } from '../utils/functions';
import { cahceRequests } from '../store/actionCreators';
import { Status } from '../utils/types';

const statuses: { label: Status, value: Status }[] = [
  { label: 'New', value: 'New' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Under Review', value: 'Under Review' },
  { label: 'Done', value: 'Done' },
];

const headers: TableHeader<Request>[] = [
  { label: 'Reference No.', name: 'reference_no', type: 'numeric', hasSort: false, hasFilter: true },
  { label: 'Address to', name: 'address_to', type: 'text', hasSort: false, hasFilter: true },
  { label: 'Purpose', name: 'purpose', type: 'text', hasSort: false, hasFilter: false },
  { label: 'Issued on', name: 'issued_on', type: 'date', hasSort: true, hasFilter: false },
  { label: 'Status', name: 'status', type: 'select', options: statuses, hasSort: true, hasFilter: true },
];


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

  const handleSort = useCallback((col: TableHeader<Request>, dir: SortDir) => {
    const sortFunc = sortFuncs[col.type];
    if (!sortFunc) return;
    const reqCopy = [...requests];
    const sorted = sortFunc(reqCopy, dir, col.name);
    cahceRequests(sorted);
  }, [requests]);

  const handleFilter = useCallback((filter: Filter<Request>) => {
    let reqCopy = [...requests];

    Object.keys(filter).forEach(key => {
      const field = key as keyof Request;
      const col = filter[field];
      if (!col) return;
      if (col.val === '' || col.val === undefined) return;
      const filterFunc = filterFuncs[col.type];
      if (!filterFunc) return;
      reqCopy = filterFunc(reqCopy, col.val, field);
    });

    cahceRequests(reqCopy);
  }, [requests]);

  if (!user) return <Navigate to="/login" replace={true} />;

  return <Container $maxWidth={1024}>
    {isLoading ? 'Loading...' : <DataTable<Request> headers={headers} data={requests} onSort={handleSort} onFilter={handleFilter} />}
  </Container>;
};

export default Requests;