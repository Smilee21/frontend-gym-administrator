import { create } from 'zustand'

interface DialogProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  dialogData: string[]
  setDialogData(data: []): void
}

export const useDialog = create<DialogProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  dialogData: [],
  setDialogData: (dialogData) => set({ dialogData: dialogData }),
}))
