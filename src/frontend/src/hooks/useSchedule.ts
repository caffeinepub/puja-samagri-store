import { useCallback, useState } from "react";

export type ScheduleStatus = "active" | "paused" | "cancelled";

export type TimeSlot = {
  id: string;
  label: string;
  time: string;
  icon: string;
};

export const TIME_SLOTS: TimeSlot[] = [
  {
    id: "morning-puja",
    label: "Morning Puja",
    time: "6:00 – 8:00 AM",
    icon: "🌅",
  },
  { id: "morning", label: "Morning", time: "8:00 – 10:00 AM", icon: "🌤️" },
  { id: "afternoon", label: "Afternoon", time: "12:00 – 2:00 PM", icon: "☀️" },
  {
    id: "evening-aarti",
    label: "Evening Aarti",
    time: "5:00 – 7:00 PM",
    icon: "🪔",
  },
];

export type ScheduleItem = {
  productId: bigint;
  productName: string;
  quantity: number;
  price: bigint;
  unit: string;
};

export type Schedule = {
  id: string;
  items: ScheduleItem[];
  timeSlotId: string;
  days: string[];
  startDate: string;
  endDate?: string;
  noEndDate: boolean;
  status: ScheduleStatus;
  createdAt: string;
};

const STORAGE_KEY = "pujaSchedules";

function loadSchedules(): Schedule[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Re-hydrate bigints from strings
    return parsed.map(
      (
        s: Schedule & {
          items: (ScheduleItem & { productId: string; price: string })[];
        },
      ) => ({
        ...s,
        items: s.items.map((item) => ({
          ...item,
          productId: BigInt(item.productId),
          price: BigInt(item.price),
        })),
      }),
    );
  } catch {
    return [];
  }
}

function saveSchedules(schedules: Schedule[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
}

export function useSchedule() {
  const [schedules, setSchedules] = useState<Schedule[]>(() => loadSchedules());

  const addSchedule = useCallback(
    (schedule: Omit<Schedule, "id" | "createdAt" | "status">) => {
      const newSchedule: Schedule = {
        ...schedule,
        id: `schedule-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: "active",
      };
      setSchedules((prev) => {
        const next = [...prev, newSchedule];
        saveSchedules(next);
        return next;
      });
      return newSchedule.id;
    },
    [],
  );

  const updateStatus = useCallback((id: string, status: ScheduleStatus) => {
    setSchedules((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, status } : s));
      saveSchedules(next);
      return next;
    });
  }, []);

  const pauseSchedule = useCallback(
    (id: string) => updateStatus(id, "paused"),
    [updateStatus],
  );
  const resumeSchedule = useCallback(
    (id: string) => updateStatus(id, "active"),
    [updateStatus],
  );
  const cancelSchedule = useCallback(
    (id: string) => updateStatus(id, "cancelled"),
    [updateStatus],
  );

  return {
    schedules,
    addSchedule,
    pauseSchedule,
    resumeSchedule,
    cancelSchedule,
  };
}
