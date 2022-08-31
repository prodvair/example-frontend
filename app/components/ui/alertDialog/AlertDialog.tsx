import { styled } from "@/stitches.config";
import { blackA } from "@radix-ui/colors";
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { FC, ReactNode } from "react";
import { contentShow, overlayShow } from "../keyFrames";

export const AlertDialogOverlay = styled(AlertDialogPrimitive.Overlay, {
  backgroundColor: blackA.blackA9,
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

export const AlertDialogContentStyled = styled(AlertDialogPrimitive.Content, {
  backgroundColor: '$white',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '500px',
  maxHeight: '85vh',
  padding: 25,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': { outline: 'none' },
});

export interface AlertDialogContentProps {
  children: ReactNode,
}

export const AlertDialogContent: FC<AlertDialogContentProps> = ({ children, ...props }) =>{
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogOverlay  />
      <AlertDialogContentStyled {...props}>{children}</AlertDialogContentStyled>
    </AlertDialogPrimitive.Portal>
  );
}

export const AlertDialogTitle = styled(AlertDialogPrimitive.Title, {
  margin: 0,
  color: "$black",
  fontSize: 20,
  fontWeight: 500,
});

export const AlertDialogDescription = styled(AlertDialogPrimitive.Description, {
  marginBottom: 20,
  color: "$black",
  fontSize: 15,
  lineHeight: 1.5,
  "& span": {
    display: "inline-block",
    backgroundColor: "$grayLight",
    paddingX: 5,
    borderRadius: 5,
  }
});

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogAction = AlertDialogPrimitive.Action;
export const AlertDialogCancel = AlertDialogPrimitive.Cancel;
