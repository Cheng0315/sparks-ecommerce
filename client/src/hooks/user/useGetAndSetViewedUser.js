import { apiAxios } from "../../services/api/authAxios";
import { useEffect } from "react";

const useGetAndSetViewedUser = (userId, setViewedUser, setViewedUserNotFound) => {

  useEffect(() => {
    /* Create an instance of AbortController to cancel network request when needed */
    const controller = new AbortController();
    
    const getAndSetViewedUSer = async () => {
      try {
        const response = await apiAxios.get(`/api/users/${userId}`, {
          signal: controller.signal
        });

        if (response && response.data) setViewedUser(response.data.user);
      } catch (error) {
        if (error.name !== 'CanceledError') {
          console.error('Error fetching user data:', error);
        }
        
        /* Check if the error is a 404 (user not found) */
        if (error.response && error.response.status === 404) { 
          setViewedUserNotFound(true); 
        }
      }
    };

    getAndSetViewedUSer();

    return () => {
      /* Cancel ongoing network request when the component unmount */
      controller.abort();
    }
  }, [userId]);
};

export default useGetAndSetViewedUser;
