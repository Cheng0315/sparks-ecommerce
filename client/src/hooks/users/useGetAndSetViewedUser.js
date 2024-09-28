import { authAxios } from "../../services/api/authAxios";
import { useEffect } from "react";

const useGetAndSetViewedUser = (id, setViewedUser) => {
  const authorizedAxios = authAxios();

  useEffect(() => {
    /* Create an instance of AbortController to cancel network request when needed */
    const controller = new AbortController();

    const getAndSetViewedUSer = async () => {
      try {
        const response = await authorizedAxios.get(`/api/users/${id}`, {
          signal: controller.signal
        });
        setViewedUser(response.data);
      } catch (error) {
        if (error.name !== 'CanceledError') {
          console.error('Error fetching user data:', error);
        }
      }
    };

    getAndSetViewedUSer();

    return () => {
      /* Cancel ongoing network request when the component unmount */
      controller.abort();
    }
  }, [id]);
};

export default useGetAndSetViewedUser;