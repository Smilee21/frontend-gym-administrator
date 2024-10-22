'use client'
import { useDialog } from '@/hooks/useDialog'
import {
  DialogContent,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useSearchParams } from 'next/navigation'
import { useDialogSuscribe } from '@/hooks/useDialogSuscribe'
import { inscribeUser } from '@/app/(myaccount)/myaccount/myaccount.api'
import {
  useDialogOnInscribeFailed,
  useDialogOnInscribeSuccess,
} from '@/hooks/use-on-inscribe'

import { ResponseInscribe } from '@/interfaces/response'

function DialogComponent() {
  const { isOpen, onClose } = useDialog()
  const searchParams = useSearchParams()
  const spaces = Number(searchParams.get('spaces'))

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Hello</DialogTitle>
          <DialogDescription>
            {spaces > 0
              ? 'Do you want to sign up for this class?'
              : 'No spaces available for this training session'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
          {spaces > 0 && (
            <Link
              href={`myaccount`}
              className="flex px-6 items-center border-[1.5] rounded-md border-black bg-green-600 hover:bg-green-900 shadow-md active:bg-opacity-5"
            >
              Yes
            </Link>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DialogComponentEnterInClass() {
  const { isOpen, onClose } = useDialog()
  const { onOpenResultSuccess } = useDialogOnInscribeSuccess()
  const { onOpenResultFailed } = useDialogOnInscribeFailed()

  const searchParams = useSearchParams()
  const trainingSessionId = searchParams.get('training-session')
  const clientEmail = searchParams.get('client-email')
  const spaces = Number(searchParams.get('spaces'))

  const handleInscribe = async (
    clientEmail: string,
    trainingSessionId: string
  ) => {
    const result: ResponseInscribe = await inscribeUser(
      clientEmail,
      trainingSessionId
    )

    if (result.response.success) {
      onOpenResultSuccess()
      onClose()
    } else {
      onOpenResultFailed()
      onClose()
    }
    return result
  }

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Hello</DialogTitle>
          <DialogDescription>
            {spaces > 0
              ? 'Do you want to sign up for this class?'
              : 'No spaces available for this training session'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            className="text-white bg-slate-900"
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          {spaces > 0 && (
            <Button
              onClick={() => {
                if (clientEmail && trainingSessionId) {
                  console.log(clientEmail, trainingSessionId)
                  handleInscribe(clientEmail, trainingSessionId)
                }
              }}
              className="flex px-6 text-black items-center border-[1.5] rounded-md border-black bg-slate-400 hover:bg-slate-200 shadow-md active:bg-opacity-5"
            >
              Yes!
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DialogOnEnterInClassSuccess() {
  const { isOpen, onCloseResultSuccess } = useDialogOnInscribeSuccess()

  return (
    <Dialog
      onOpenChange={onCloseResultSuccess}
      open={isOpen}
      modal
      defaultOpen={isOpen}
    >
      <DialogContent className="sm:max-w-md ">
        <DialogHeader className="">
          <DialogTitle>You have successfully registered</DialogTitle>
          <DialogDescription>
            You can see your pending classes in the my classes section
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            className="text-white bg-slate-900"
            type="button"
            variant="outline"
            onClick={onCloseResultSuccess}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DialogOnEnterInClassFailed() {
  const { isOpen, onCloseResultFailed } = useDialogOnInscribeFailed()

  return (
    <Dialog
      onOpenChange={onCloseResultFailed}
      open={isOpen}
      modal
      defaultOpen={isOpen}
    >
      <DialogContent className="sm:max-w-md ">
        <DialogHeader className="">
          <DialogTitle>There was an error when registering</DialogTitle>
          <DialogDescription>
            Please check if you are already registered for this class.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            className="text-white bg-slate-900"
            type="button"
            variant="outline"
            onClick={onCloseResultFailed}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DialogComponentSuscribe() {
  const { isOpen, onClose } = useDialogSuscribe()

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome</DialogTitle>
          <DialogDescription>
            do you want to subscribe to this plan?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
          <Link
            href={`/myaccount`}
            className="flex px-6 items-center border-[1.5] rounded-md border-black bg-green-600 hover:bg-green-900 shadow-md active:bg-opacity-5"
          >
            Yes!
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DialogComponent, DialogComponentSuscribe, DialogComponentEnterInClass }
