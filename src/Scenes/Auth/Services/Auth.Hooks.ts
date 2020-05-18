import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

interface IHashData {
  access_token: string;
  expires_in: string;
  token_type: string;
}

export function useHash() {
  const [hashData, setHashData] = useState<IHashData | null>(null);
  const location = useLocation();
  const hash = location.hash;

  useEffect(() => {
    if (hash) {
      const getData = hash
        .substring(1)
        .split("&")
        .reduce((initial: any, item): IHashData => {
          if (item) {
            const parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }

          return initial;
        }, {});

      setHashData(getData);
    }
  }, [hash]);

  return { hashData };
}
