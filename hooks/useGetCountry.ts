import { locations } from "constant";
import { UserInforContext } from "Context/UserInforContext";
import { useContext } from "react";

const useGetCountry = () => {
  const { user } = useContext(UserInforContext);
  const { location } = user;

  const country =
    locations.find((item) => item.value === location) || locations[0];

  return country;
};

export default useGetCountry;
