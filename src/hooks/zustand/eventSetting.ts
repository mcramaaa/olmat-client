import { create } from "zustand";

interface IeventSettingStore {
  name: string;
  start: string;
  end: string;
  amount: number;
  free: number;
}

const eventStore = create<IeventSettingStore>(() => ({
  name: "",
  start: "",
  end: "",
  amount: 0,
  free: 0,
}));

export const useEvent = () => {
  const name = eventStore((e) => e.name);
  const start = eventStore((e) => e.start);
  const end = eventStore((e) => e.end);
  const amount = eventStore((e) => e.amount);
  const free = eventStore((e) => e.free);

  const setName = (setIsName: string) => {
    eventStore.setState({
      name: setIsName,
    });
  };
  const setStart = (setIsStart: string) => {
    eventStore.setState({
      start: setIsStart,
    });
  };
  const setEnd = (setIsEnd: string) => {
    eventStore.setState({
      end: setIsEnd,
    });
  };
  const setAmount = (setIsAmount: number) => {
    eventStore.setState({
      amount: setIsAmount,
    });
  };
  const setFree = (setIsFree: number) => {
    eventStore.setState({
      free: setIsFree,
    });
  };

  return {
    name,
    setName,
    start,
    setStart,
    end,
    setEnd,
    amount,
    setAmount,
    free,
    setFree,
  };
};
