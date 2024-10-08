import { create } from "zustand";

const useStore = create(
  /**
   * @desc patch | Applicative patch
   * @param  {(partial: ((state: StoreState) => Partial<StoreState>)) => void} set
   */
  (set) => ({
    count: 1,
    inc: () => set((state) => ({ count: state.count + 1 })),
    dec: () => set((state) => ({ count: state.count - 1 })),
    zero: () => set(() => ({ count: 0 })),
  })
);

export function Counter() {
  const store = useStore();
  return (
    <div>
      <div>{store.count}</div>
      <button onClick={store.inc}>plus</button>
      <button onClick={store.dec}>minus</button>
      <button onClick={store.zero}>zero</button>
    </div>
  );
}
