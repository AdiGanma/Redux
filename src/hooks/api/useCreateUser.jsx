import axios from "axios";
import { BASE_URL } from "../../helpers";

const useCreateUser = () => {
  const creatUser = async (data) => {
    try {
      await axios.post(BASE_URL + "/users", { ...data });
    } catch (error) {
      console.log(error);
    }
  };
  return { creatUser };
};

export default useCreateUser;
