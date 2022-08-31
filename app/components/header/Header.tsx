import { styled } from "@/stitches.config";

export const Header = styled("header", {
  display: "flex",
  width: "100vw",
  height: "70px",
  alignItems: "center",
  justifyContent: "space-between",
  color: "$white",
  paddingX: "40px",
  "& .header__left": {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  "& .header__right": {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  "& .header__user": {
    cursor: "pointer",
    transition: "all .2s ease",
    "&:hover": {
      color: "$black"
    },
    "&-name": {
      paddingLeft: 15,
      fontWeight: 500,
      fontSize: 18
    },
    
  },
  
  variants: {
    color: {
      transparent: {
        background: "transparent",
      },
      white: {
        background: "$white",
      },
    },
  },
});
