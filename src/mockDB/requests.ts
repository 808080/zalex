import { ID, IssueDate, Status } from '../utils/types';
import { User } from './users';

export type Request = {
  id: ID,
  address_to: string,
  purpose: string,
  issued_on: IssueDate,
  reference_no: number,
  status: Status,
  employee_id: User['id']
};

export type RawRequest = Omit<Request, 'id' | 'employee_id'>;


const ID_COUNTER_STORAGE_NAME = 'request_id';

export const getRequestIdCount = () => (localStorage.getItem(ID_COUNTER_STORAGE_NAME) || '1') as ID;
const setRequestIdCount = (id: ID) => localStorage.setItem(ID_COUNTER_STORAGE_NAME, id);



const REQUESTS_STORAGE_NAME = 'requests';

export const getRequests = (): Request[] => JSON.parse(localStorage.getItem(REQUESTS_STORAGE_NAME) || '[]');
export const setRequests = (requests: Request[]) => localStorage.setItem(REQUESTS_STORAGE_NAME, JSON.stringify(requests));

export const addRequest = (request: Request) => {
  const requests = getRequests();
  requests.push(request);
  setRequests(requests);
  setRequestIdCount(`${+request.id + 1}`);
};
export const putRequest = (request: Request) => {
  const requests = getRequests();
  const index = requests.findIndex(r => r.id === request.id);
  requests[index] = request;
  setRequests(requests);
};

export const getRequestById = (id: Request['id']) => getRequests().find(r => r.id === id);
export const getRequestsByUserId = (id: User['id']) => getRequests().filter(r => r.employee_id === id);

export const clearRequests = () => {
  setRequests([]);
  setRequestIdCount('1');
};