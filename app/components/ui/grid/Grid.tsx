import { styled } from "@/stitches.config";

export const Grid = styled("div", {
  display: "grid",
  width: "100%",
  paddingX: 20,
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  gap: 20,
})