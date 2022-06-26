import create from 'zustand'

interface BearState {
  bears: number
  increase: (by: number) => void
  log: () => void
}

const useAudioController = create<BearState>()((set, get) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  log: () => { console.log(get().bears); }
}))

export default useAudioController;