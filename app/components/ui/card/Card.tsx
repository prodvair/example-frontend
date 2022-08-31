import { styled } from "@/stitches.config";
import { purple, green, yellow, blue, red, orange } from '@radix-ui/colors';

export const Card = styled("div", {
  display: "block",
  borderRadius: 10,
  color: "$black",
  padding: 20,
  paddingTop: 10,
  boxShadow: "$outside",
  backgroundColor: "$white",
  borderTop: "10px solid $white",
  position: "relative",
  variants: {
    color: {
      purple: {
        borderColor: purple.purple9
      },
      green: {
        borderColor: green.green9
      },
      yellow: {
        borderColor: yellow.yellow9
      },
      blue: {
        borderColor: blue.blue9
      },
      red: {
        borderColor: red.red9
      },
      orange: {
        borderColor: orange.orange9
      }
    }
  }
})

export const CardContent = styled("p", {
  fontSize: 15
}) 

export const CardDate = styled("span", {
  position: "absolute",
  bottom: 10,
  fontSize: 12,
  fontWeight: 300,
  color: "$gray"
}) 

export const CardAction = styled("div", {
  position: "absolute",
  right: 20,
  display: "flex"
}) 

export const CardActionItem = styled("button", {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  "&:hover svg path": {
    fill: "$purple"
  }
}) 