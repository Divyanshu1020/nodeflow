import { useEffect, useState } from "react";

interface UseEntitySearchProps<
  T extends {
    search: string;
    page: number;
  }
> {
  params: T;
  setParams: (params: T) => void;
  debouncedMS: number;
}

export function useEntitySearch<
  T extends {
    search: string;
    page: number;
  }
>({ params, setParams, debouncedMS }: UseEntitySearchProps<T>) {
  const [search, setSearch] = useState(params.search);

  useEffect(() => {
    // Immediate Update Logic:
    // We use this 'if' block to bypass the debounce timer in specific cases.
    // - If 'search' is empty, we want to clear the results immediately.
    // - The check (params.search !== "") appears to force a reset of the parent params
    //   under certain conditions, likely to ensure state consistency or reset behavior.
    if (search === "" && params.search !== "") {
      setParams({ ...params, search: "" });
      return;
    }

    // Debounce Logic:
    // We use setTimeout to delay updating the parent 'params' until the user stops typing
    // for 'debouncedMS' milliseconds. This prevents excessive API calls or updates.
    const timer = setTimeout(() => {
      if (search !== params.search) {
        setParams({ ...params, search });
      }
    }, debouncedMS);

    // Cleanup the timer if the user types again before the delay finishes
    return () => clearTimeout(timer);
  }, [debouncedMS, params, search]);

  // Synchronization Effect (Dual useEffect):
  // This second useEffect is necessary to keep the local 'search' state in sync with the
  // parent 'params'. If 'params' changes externally (e.g., via URL or another component),
  // this updates the local input value to match.
  useEffect(() => {
    setSearch(params.search);
  }, [params]);

  return { search, setSearch };
}
