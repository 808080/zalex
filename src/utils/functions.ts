import { ColType, SortDir } from '../components/DataTable';
import { Request } from '../mockDB/requests';
import { getUserByEmail } from '../mockDB/users';
import { cahceRequests } from '../store/actionCreators';


export const isAvailableEmail = (email: string) => new Promise<boolean>((resolve) => {
  const user = getUserByEmail(email);
  return resolve(!user);
});

export const debounce = (func: Function, timeout = 300) => {
  let timer: number;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), timeout);
  };
};

export const sortFuncs: { [col in ColType]?: (requests: Request[], dir: SortDir) => void } = {
  date: (requests: Request[], dir: SortDir) => {
    requests.sort((a, b) => {
      const timePrev = new Date(a.issued_on).getTime();
      const timeNext = new Date(b.issued_on).getTime();
      return dir === 'asc' ? timePrev - timeNext : timeNext - timePrev;
    });

    cahceRequests(requests);
  },
  select: (requests: Request[], dir: SortDir) => {
    requests.sort((a, b) => {
      return dir === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
    });

    cahceRequests(requests);
  }
};
