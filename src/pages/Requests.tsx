import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../mockDB/users';
import DataTable from '../components/DataTable';
import { Request } from '../mockDB/requests';
import useRequests from '../hooks/useRequests';
import Container from '../components/Container';

const headers: { label: string, name: keyof Request }[] = [
  { label: 'Reference No.', name: 'reference_no' },
  { label: 'Address to', name: 'address_to' },
  { label: 'Purpose', name: 'purpose' },
  { label: 'Issued on', name: 'issued_on' },
  { label: 'Status', name: 'status' },
];




const Requests = () => {
  const user = getCurrentUser();
  const { isLoading, requests } = useRequests();

  if (!user) return <Navigate to="/login" replace={true} />;

  return <Container $maxWidth={1024}>
    {isLoading ? 'Loading...' : <DataTable<Request> headers={headers} data={requests} />}
  </Container>;
};

export default Requests;