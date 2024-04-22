import { useEffect, useState } from "react";

export function useLocalStorage(key, InitialData) {
  const [data, setData] = useState(InitialData);

  useEffect(() => {
    const getdata = JSON.parse(localStorage.getItem(key));
    if (!getdata) {
      localStorage.setItem(key, JSON.stringify(InitialData));
    } else {
      setData(getdata);
    }
  }, []);

  function updateLocalStore(newData) {
    if (typeof newData === "function") {
      localStorage.setItem(key, JSON.stringify(newData(data)));
    } else {
      localStorage.setItem(key, JSON.stringify(newData));
    }
    setData(newData);
  }
  return [data, updateLocalStore];
}
