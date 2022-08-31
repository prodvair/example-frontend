import { styled } from '@/stitches.config';
import { blackA } from '@radix-ui/colors';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { FC, ReactNode } from 'react';
import { contentShow, overlayShow } from '../keyFrames';

export const DialogOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: blackA.blackA9,
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

export const DialogContentStyled = styled(DialogPrimitive.Content, {
  backgroundColor: '$white',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  minHeight: 'fit-content',
  padding: 25,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': { outline: 'none' },
});

export interface DialogContentProps {
  children: ReactNode,
}
export const DialogContent: FC<DialogContentProps> = ({ children, ...props }) => {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay  />
      <DialogContentStyled {...props}>{children}</DialogContentStyled>
    </DialogPrimitive.Portal>
  );
}

export const DialogTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: 500,
  color: "$black",
  fontSize: 20,
});

export const DialogDescription = styled(DialogPrimitive.Description, {
  margin: '10px 0 20px',
  color: "$black",
  fontSize: 15,
  lineHeight: 1.5,
});

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;