import { styled } from "@/stitches.config";

export const Box = styled("div", {
  variants: {
    type: {
      flex: {
        display: "flex",
      },
      block: {
        display: "block",
      },
      modal: {
        display: "flex",
        flexDirection: "column",
        boxShadow: "$outside",
        borderRadius: 10,
        paddingX: 60,
        paddingY: 30
      },
      fullScreen: {
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 70px)",
        width: "100vw",
        // maxHeight: "100%",
        paddingBottom: 40
      }
    },
    color: {
      white: {
        backgroundColor: "$white",
        color: "$black",
      },
      black: {
        backgroundColor: "$black",
        color: "$white",
        boxShadow: "$outside"
      },
    },
    alignH: {
      left: {
        alignItems: "flex-start"
      },
      center: {
        alignItems: "center"
      },
      right: {
        alignItems: "flex-end"
      },
    },
    alignV: {
      top: {
        justifyContent: "flex-start"
      },
      center: {
        justifyContent: "center"
      },
      bottom: {
        justifyContent: "flex-end"
      },
    },
  },
  defaultVariants: {
    type: "flex"
  }
})