import { useEffect } from "react";
import { setAccessToken, setUser, clearUser, clearAccessToken } from "../../features/slices";
import { apiAxios } from "../../services/api/authAxios";
import { useDispatch } from "react-redux";

const useCheckAccessToken = (accessToken, setLoading) => {
  const dispatch = useDispatch();

  useEffect(() => {
    /* Create an instance of AbortController to cancel network request when needed */
    const controller = new AbortController();

    /* If access token doesn't exists, use refresh token(if it exists) to generate new tokens */
    const checkAccessTokens = async () => {
      try {
        if (!accessToken) {
          const response = await apiAxios.post("/api/users/renew-tokens", { signal: controller.signal });

          if (response) {
            dispatch(setUser({ user: response.data.user }));
            dispatch(setAccessToken({ accessToken: response.data.accessToken }));
          }
        }
      } catch (error) {
        dispatch(clearUser());
        dispatch(clearAccessToken());
        console.error("Failed to renew tokens", error);
      } finally {
        setLoading(false);
      }
    };

    checkAccessTokens();

    return () => {
      /* Cancel ongoing network request when the component unmount */
      controller.abort();
    };
  }, []);
};

export default useCheckAccessToken;