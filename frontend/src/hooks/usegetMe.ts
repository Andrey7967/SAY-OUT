import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../states/Store';
import { setIsLogged, setLoggedNickname, setUserId } from '../states/Slice';
import { PCHost } from '../../hostingAdress';

export default function useLogIn() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const axi = async () => {
      try {
        const result = await axios.get(PCHost + '/getme', {
          withCredentials: true,
        });

        dispatch(setIsLogged({ data: true }));
        dispatch(setLoggedNickname({ data: result.data.nickname }));
        dispatch(setUserId({ data: result.data.id }));
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    axi();
  }, []);

  return { loading, error };
}
