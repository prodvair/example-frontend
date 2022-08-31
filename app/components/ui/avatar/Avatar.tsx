import React from "react";

import { styled } from "@/stitches.config";
import { blackA, violet } from "@radix-ui/colors";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

export const Avatar = styled(AvatarPrimitive.Root, {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  verticalAlign: "middle",
  overflow: "hidden",
  userSelect: "none",
  borderRadius: "100%",
  backgroundColor: "$black",
  variants: {
    size: {
      small: {
        fontSize: 15,
        width: 50,
        height: 50,
        border: "1px solid $black",
      },
      normal: {
        fontSize: 20,
        width: 70,
        height: 70,
        border: "2px solid $black",
      },
      big: {
        fontSize: 30,
        width: 100,
        height: 100,
        border: "3px solid $black",
      }
    },
  },
  defaultVariants: {
    size: "normal"
  }
});

export const AvatarImage = styled(AvatarPrimitive.Image, {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
});

export const AvatarFallback = styled(AvatarPrimitive.Fallback, {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "$white",
  color: "$black",
  fontSize: "inherit",
  lineHeight: 1,
  fontWeight: 500,
});
