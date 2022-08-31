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
  width: 50,
  height: 50,
  borderRadius: "100%",
  backgroundColor: "$black",
  border: "1px solid $black",
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
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
});
