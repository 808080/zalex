import { useEffect, useState } from 'react';
import { RawRequest, Request, getRequests, getRequestsByUserId, setRequests } from '../mockDB/requests';
import httpRequest, { HTTPmethods } from '../utils/http';
import { getCurrentUser } from '../mockDB/users';
import { useTypedSelector } from './useTypedSelect';
import { cahceRequests } from '../store/actionCreators';

const useRequests = () => {
  const [isLoading, setLoading] = useState(true);
  const { requests } = useTypedSelector(state => state.request);
  const user = getCurrentUser()!;

  useEffect(() => {
    if (!user) return;

    const storageRequests = getRequestsByUserId(user.id);

    if (!storageRequests.length) { // set demo data for the current user if there is non
      httpRequest<RawRequest[]>(HTTPmethods.GET, '/request-list').then(res => {
        if (res instanceof Array) {
          const fetchedRequests: Request[] = res.map((request, index) => {
            return { ...request, id: `${index + 1}`, employee_id: user.id };
          });

          cahceRequests(fetchedRequests);
          setRequests([...getRequests(), ...fetchedRequests]);
        }
        setLoading(false);
      });
    } else {
      cahceRequests(storageRequests);
      setLoading(false);
    }
  }, []);

  return { isLoading, requests };

};

export default useRequests;