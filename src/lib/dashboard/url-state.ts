"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Page state kept in the query string (CLAUDE.md §4.3): filters and the open row survive a refresh
 * and can be shared as a link. `set` merges a patch; empty values drop the key. replace, not push:
 * filtering doesn't fill the back button.
 */
export function useUrlState<K extends string>(keys: readonly K[]) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const values = React.useMemo(
    () => Object.fromEntries(keys.map((k) => [k, params.get(k) ?? ""])) as Record<K, string>,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params, keys.join()],
  );

  const set = React.useCallback(
    (patch: Partial<Record<K, string | null>>) => {
      const next = new URLSearchParams(params.toString());
      for (const [k, v] of Object.entries(patch) as [K, string | null][]) {
        if (v) next.set(k, v);
        else next.delete(k);
      }
      const query = next.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [params, router, pathname],
  );

  return [values, set] as const;
}
