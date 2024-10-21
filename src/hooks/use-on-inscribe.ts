import { create } from 'zustand'

interface DialogOnInscribeProps {
  isOpen: boolean
  onOpenResultSuccess: () => void
  onCloseResultSuccess: () => void
  dialogData: string[]
  setDialogData(data: []): void
}

interface DialogOnInscribeFailedProps {
  isOpen: boolean
  onOpenResultFailed: () => void
  onCloseResultFailed: () => void
  dialogData: string[]
  setDialogDataFailed(data: []): void
}

export const useDialogOnInscribeSuccess = create<DialogOnInscribeProps>(
  (set) => ({
    isOpen: false,
    onOpenResultSuccess: () => set({ isOpen: true }),
    onCloseResultSuccess: () => set({ isOpen: false }),
    dialogData: [],
    setDialogData: (dialogData) => set({ dialogData: dialogData }),
  })
)

export const useDialogOnInscribeFailed = create<DialogOnInscribeFailedProps>(
  (set) => ({
    isOpen: false,
    onOpenResultFailed: () => set({ isOpen: true }),
    onCloseResultFailed: () => set({ isOpen: false }),
    dialogData: [],
    setDialogDataFailed: (dialogData) => set({ dialogData: dialogData }),
  })
)
