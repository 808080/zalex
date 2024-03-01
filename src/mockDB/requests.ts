import { ID, IssueDate, Reference, Status } from '../utils/types';
import { User } from './users';

export type Request = {
  id: ID,
  address_to: string,
  purpose: string,
  issued_on: IssueDate,
  reference_no: Reference,
  status: Status,
  employee_id: User['id']
};

export type NewRequest = Omit<Request, 'id' | 'status'>;


const ID_COUNTER_STORAGE_NAME = 'request_id';

export const getRequestIdCount = () => (localStorage.getItem(ID_COUNTER_STORAGE_NAME) || '1') as ID;
const setRequestIdCount = (id: ID) => localStorage.setItem(ID_COUNTER_STORAGE_NAME, id);



const REQUESTS_STORAGE_NAME = 'requests';

export const getRequests = (): Request[] => JSON.parse(localStorage.getItem(REQUESTS_STORAGE_NAME) || '[]');
const setRequests = (requests: Request[]) => localStorage.setItem(REQUESTS_STORAGE_NAME, JSON.stringify(requests));

export const addUser = (request: NewRequest) => {
  const users = getRequests();
  const id = getRequestIdCount();
  users.push({ ...request, id, status: 'New' });
  setRequests(users);
  setRequestIdCount(`${+id + 1}`);
  return request;
};

export const getRequestById = (id: ID) => getRequests().find(r => r.id === id);
export const getRequestsByUserId = (id: User['id']) => getRequests().filter(r => r.employee_id === id);

export const clearRequests = () => {
  setRequests([]);
  setRequestIdCount('1');
};