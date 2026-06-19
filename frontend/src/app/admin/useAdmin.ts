"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/src/services/api";
import type { AdminMessage } from "@/src/types/adminMessage";

export type Filters = {
  from: string;
  to: string;
};

export function useAdmin() {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({ from: "", to: "" });

  useEffect(() => {
    api
      .getMessages()
      .then(setMessages)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return messages.filter((msg) => {
      const date = new Date(msg.createdAt);

      if (filters.from) {
        const from = new Date(filters.from);
        from.setHours(0, 0, 0, 0);
        if (date < from) return false;
      }

      if (filters.to) {
        const to = new Date(filters.to);
        to.setHours(23, 59, 59, 999);
        if (date > to) return false;
      }

      return true;
    });
  }, [messages, filters]);

  return { messages, isLoading, error, filters, setFilters, filtered };
}
