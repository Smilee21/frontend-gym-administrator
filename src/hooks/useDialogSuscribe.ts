import { create } from 'zustand'

interface DialogSuscibeProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  dialogData: string[]
  setDialogData(data: []): void
}

export const useDialogSuscribe = create<DialogSuscibeProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  dialogData: [],
  setDialogData: (dialogData) => set({ dialogData: dialogData }),
}))
