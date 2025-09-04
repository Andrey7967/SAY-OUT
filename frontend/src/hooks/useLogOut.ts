import axios from 'axios';
import { PCHost } from '../../hostingAdress';

export default async function useLogOut() {
  const result = await axios.post(
    PCHost + '/logout',
    { s: '0' },
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return result.data.logged;
}
