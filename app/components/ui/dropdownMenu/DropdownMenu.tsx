import { FC, ReactNode, useState } from "react";

import { styled } from "@/stitches.config";
import { blackA, mauve, violet } from "@radix-ui/colors";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";

import {
  slideDownAndFade,
  slideLeftAndFade,
  slideRightAndFade,
  slideUpAndFade,
} from "../keyFrames";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const contentStyles = {
  maxWidth: 220,
  backgroundColor: "$white",
  borderRadius: 6,
  padding: 5,
  boxShadow: "$outside",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
};

const StyledContent = styled(DropdownMenuPrimitive.Content, {
  ...contentStyles,
});

const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: "$white",
});

interface IDropdownMenuContent {
  children: ReactNode;
  [key: string]: any;
}

export const DropdownMenuContent: FC<IDropdownMenuContent> = ({
  children,
  ...props
}) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <StyledContent {...props}>
        {children}
        <StyledArrow />
      </StyledContent>
    </DropdownMenuPrimitive.Portal>
  );
};

const StyledSubContent = styled(DropdownMenuPrimitive.SubContent, {
  ...contentStyles,
});

export const DropdownMenuSubContent = (props: any) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <StyledSubContent {...props} />
    </DropdownMenuPrimitive.Portal>
  );
};

const itemStyles = {
  all: "unset",
  fontSize: 13,
  lineHeight: 1,
  color: "$black",
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  height: 25,
  padding: "0 5px",
  position: "relative",
  paddingRight: "25px",
  userSelect: "none",
  "& svg": {
    marginRight: 5
  },

  "&[data-disabled]": {
    color: "$gray",
    pointerEvents: "none",
  },

  "&[data-highlighted]": {
    backgroundColor: "$black",
    color: "$white",
  },
};

export const DropdownMenuItem = styled(DropdownMenuPrimitive.Item, {
  ...itemStyles,
});

export const DropdownMenuCheckboxItem = styled(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ...itemStyles,
  }
);
export const DropdownMenuRadioItem = styled(DropdownMenuPrimitive.RadioItem, {
  ...itemStyles,
});
export const DropdownMenuSubTrigger = styled(DropdownMenuPrimitive.SubTrigger, {
  '&[data-state="open"]': {
    backgroundColor: "$black",
    color: "$white",
  },
  ...itemStyles,
});

export const DropdownMenuLabel = styled(DropdownMenuPrimitive.Label, {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: "25px",
  color: "$gray",
});

export const DropdownMenuSeparator = styled(DropdownMenuPrimitive.Separator, {
  height: 1,
  backgroundColor: "$gray",
  margin: 5,
});

export const DropdownMenuItemIndicator = styled(
  DropdownMenuPrimitive.ItemIndicator,
  {
    position: "absolute",
    left: 0,
    width: 25,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  }
);

// Exports

export const RightSlot = styled("div", {
  marginLeft: "auto",
  paddingLeft: 20,
  color: "$black",
  "[data-highlighted] > &": { color: "$white" },
  "[data-disabled] &": { color: "$gray" },
});
