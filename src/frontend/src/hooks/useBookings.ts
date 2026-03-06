import { useCallback, useState } from "react";

export type PanditBooking = {
  id: string;
  panditId: string;
  panditName: string;
  ceremonyType: string;
  date: string;
  timeSlot: string;
  address: string;
  contactName: string;
  phone: string;
  notes: string;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: string;
};

const STORAGE_KEY = "panditBookings";

function loadBookings(): PanditBooking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveBookings(bookings: PanditBooking[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function useBookings() {
  const [bookings, setBookings] = useState<PanditBooking[]>(() =>
    loadBookings(),
  );

  const addBooking = useCallback(
    (booking: Omit<PanditBooking, "id" | "createdAt" | "status">) => {
      const newBooking: PanditBooking = {
        ...booking,
        id: `booking-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: "confirmed",
      };
      setBookings((prev) => {
        const next = [...prev, newBooking];
        saveBookings(next);
        return next;
      });
      return newBooking.id;
    },
    [],
  );

  const cancelBooking = useCallback((id: string) => {
    setBookings((prev) => {
      const next = prev.map((b) =>
        b.id === id ? { ...b, status: "cancelled" as const } : b,
      );
      saveBookings(next);
      return next;
    });
  }, []);

  return { bookings, addBooking, cancelBooking };
}
