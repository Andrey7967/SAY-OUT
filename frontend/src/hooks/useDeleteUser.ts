import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../states/Store';
import {
  setIsLogged,
  setLoggedNickname,
  setUserId,
  toggleUpdateMessages,
  toggleUpdateUsers,
} from '../states/Slice';
import { PCHost } from '../../hostingAdress';

export default function useDeleteUser() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useAppDispatch();
  const deleteFunc = (id: number) => {
    const axi = async () => {
      try {
        const route = PCHost + '/adminDeleteUser';
        console.log(route);
        const result = await axios.delete(route, {
          withCredentials: true,
          params: {
            id: id,
          },
        });

        dispatch(toggleUpdateUsers());
        dispatch(toggleUpdateMessages());
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    axi();
  };

  return { deleteFunc, loading, error };
}
