import { styled } from "@/stitches.config";

export const Button = styled("button", {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid $black",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "all .2s ease",
  "& svg": {
    marginRight: 5
  },
  variants: {
    bg: {
      fill: {
        backgroundColor: "$black",
        color: "$white",
        "&:hover": {
          backgroundColor: "$white",
          color: "$black",
        },
      },
      outline: {
        backgroundColor: "$white",
        color: "$black",
        "&:hover": {
          backgroundColor: "$black",
          color: "$white",
        },
      },
    },
    size: {
      small: {
        paddingX: "15px",
        paddingY: "7px",
        fontSize: "14px",
      },
      normal: {
        padding: "12px",
        fontSize: "18x",
        fontWeight: 500,
        minWidth: "150px",
        boxShadow: "$outside",
      },
      big: {
        padding: "15px",
        fontSize: "18x",
        fontWeight: 500,
        width: "280px",
        maxWidth: "100%",
        boxShadow: "$outside",
      },
    },
  },
  defaultVariants: {
    bg: "fill",
    size: "normal",
  },
});

export const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 25,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$black",
  cursor: "pointer",
  "&:hover": { backgroundColor: "$grayLight" },
});
