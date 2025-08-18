import axios from 'axios';
import { PCHost } from '../../hostingAdress';
interface IUserField {
  name: string;
  value: any;
}
const checkUnique = async (userField: IUserField, setStateFunction) => {
  await axios
    .get(
      `http://${PCHost}:3001/check_unique/${userField.name}/${userField.value}`
    )
    .then((response) => {
      setStateFunction(response.data.result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export default checkUnique;
