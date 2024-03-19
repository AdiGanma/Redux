import axios from "axios";
import { BASE_URL } from "../../helpers";
import { addUsers } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const useGetUsers = () => {
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/users");
      dispatch(addUsers(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return { getUser };
};
