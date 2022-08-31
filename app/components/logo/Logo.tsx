import { styled } from "@/stitches.config";

export const LogoStyle = styled("div", {
  fontSize: "22px",
  fontWeight: 700,
})

export const Logo = () => {
  return <LogoStyle>Task manager</LogoStyle>
}