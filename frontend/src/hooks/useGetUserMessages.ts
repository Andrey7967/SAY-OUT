import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../states/Store';
import { setIsLogged, setLoggedNickname, setUserId } from '../states/Slice';
import { PCHost } from '../../hostingAdress';

export default function useGetUserMessage() {
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const axi = async () => {
      try {
        const result = await axios.get(PCHost + '/getUserMessages', {
          withCredentials: true,
        });

        setMessages(result.data.messages);
       
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    axi();
  }, []);

  return {messages, loading, error };
}
