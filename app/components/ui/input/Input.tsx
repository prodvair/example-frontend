import { FC, InputHTMLAttributes } from "react";

import { styled } from "@/stitches.config";

import { Box } from "../box";

export const InputStyle = styled("input", {
  backgroundColor: "$white",
  border: "1px solid $gray",
  boxShadow: "$inside",
  borderRadius: 10,

  color: "$black",
  width: 280,
  maxWidth: "100%",
  outline: "none",
  "&:placeholder": {
    color: "$gray",
  },
  "&:focus": {
    borderColor: "$purple",
  },
  variants: {
    state: {
      normal: {
        borderColor: "$gray",
      },
      success: {
        borderColor: "$green",
      },
      error: {
        borderColor: "$red",
      },
    },
    sz: {
      normal: {
        paddingY: 15,
        paddingX: 18,
        fontSize: 16,
        width: 280,
      },
      small: {
        paddingY: 7,
        paddingX: 15,
        fontSize: 16,
        width: 180,
      },
    },
  },
  defaultVariants: {
    sz: "normal",
  },
});

export const Hint = styled("div", {
  marginTop: 3,
  fontSize: 12,
  color: "$red",
  wordWrap: "normal",
  variants: {
    sz: {
      normal: {
        maxWidth: 280,
      },
      small: {
        maxWidth: 180,
      },
    },
  },
  defaultVariants: {
    sz: "normal",
  },
});

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sz?: "normal" | "small";
  hint?: string;
}

export const Input: FC<InputProps> = ({ hint, sz, ...props }) => {
  return (
    <Box type="block" css={{ marginBottom: 20 }}>
      <InputStyle state={hint ? "error" : "normal"} {...props} />
      {hint ? <Hint sz={sz}>{hint}</Hint> : ""}
    </Box>
  );
};
