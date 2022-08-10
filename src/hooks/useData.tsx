import { useEffect, useState } from "react";
import { getDigimons } from "../services/card";

const useData = () => {
  const [data, setData] = useState<unknown>();
  useEffect(() => {
    let ignore = false;
    async function getData() {
      const response = await getDigimons();
      setData(response);
    }

    if (!ignore) getData();

    return () => {
      ignore = true;
    };
  }, []);

  return data;
};

export default useData;
