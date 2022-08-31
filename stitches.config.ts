import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      bg: "linear-gradient(100.25deg, #9D8CFC 10.86%, #0AC5B3 80.82%)",
      white: "#DED8E4",
      black: "#1B141D",
      gray: "#A09FA5",
      grayLight: "#C6C5CC",
      green: "#0AC5B3",
      red: "#FF6269",
      purple: "#9D8CFC"
    },
    shadows: {
      inside: "inset 5px 5px 7px rgba(27, 20, 29, 0.13)",
      outside:
        "-10px -10px 18px rgba(238, 241, 253, 0.5), 10px 10px 18px rgba(27, 20, 29, 0.15)",
    },
  },
  utils: {
    paddingX: (value: string | number) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: (value: string | number) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    marginX: (value: string | number) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: (value: string | number) => ({
      marginTop: value,
      marginBottom: value,
    }),
  },
});
