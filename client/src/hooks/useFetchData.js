import { useState, useEffect } from "react";
import { authAxios } from "../services/api/authAxios";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const authorizedAxios = authAxios();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await authorizedAxios.get(url);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetchData;