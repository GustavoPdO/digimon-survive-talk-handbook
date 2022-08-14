import { useEffect, useState } from "react";
import { getDigimons } from "../services/card";

const useData = (dependency?: boolean) => {
  const [data, setData] = useState<unknown>();
  useEffect(() => {
    async function getData() {
      const response = await getDigimons();
      setData(response);
    }

    if (!dependency) getData();
  }, [dependency]);

  return data;
};

export default useData;
