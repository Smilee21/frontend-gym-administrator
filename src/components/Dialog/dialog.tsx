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

function DialogComponent() {
  const { isOpen, onClose } = useDialog()
  const searchParams = useSearchParams()
  const trainingSessionId = searchParams.get('training-session')
  const spaces = Number(searchParams.get('spaces'))

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{`Hello`}</DialogTitle>
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
              href={`myaccount/enter-class/${trainingSessionId}`}
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

function DialogComponentSuscribe() {
  const { isOpen, onClose } = useDialogSuscribe()
  const searchParams = useSearchParams()
  const subscriptionId = searchParams.get('subscription')

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
            href={`myaccount/membership/subscribe/${subscriptionId}`}
            className="flex px-6 items-center border-[1.5] rounded-md border-black bg-green-600 hover:bg-green-900 shadow-md active:bg-opacity-5"
          >
            Yes!
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DialogComponent, DialogComponentSuscribe }
