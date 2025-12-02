import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../states/Store';
import { setIsLogged, setLoggedNickname, setUserId } from '../states/Slice';
import { PCHost } from '../../hostingAdress';

export default function useGetUser() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const role = useAppSelector((state) => state.app.role);
  const update = useAppSelector((state) => state.app.updateUsers);
  useEffect(() => {
    const axi = async () => {
      try {
        const result = await axios.get(PCHost + '/adminGetUsers', {
          withCredentials: true,
        });

        setUsers(result.data.users);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    axi();
  }, [update]);

  return { users, loading, error };
}
