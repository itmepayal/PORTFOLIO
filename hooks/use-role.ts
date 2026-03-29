import { useEffect, useState } from "react";

export const useRole = (roles: string[], interval: number = 2500) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!roles.length) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, interval);

    return () => clearInterval(timer);
  }, [roles, interval]);

  return roles[index];
};
