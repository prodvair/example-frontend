import { styled } from "@/stitches.config";
import { blue, green, orange, purple, red, yellow } from "@radix-ui/colors";
import * as RadioGroup from "@radix-ui/react-radio-group";

export const ColorPickerStyled = styled(RadioGroup.Root, {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  width: 200,
  height: 50,
  backgroundColor: "$white",
  padding: 5,
  border: "1px solid $gray",
  boxShadow: "$inside",
  borderRadius: 5
});

export const ColorPickerItemStyled = styled(RadioGroup.Item, {
  cursor: "pointer",
  appearance: "none",
  border: "1px solid $gray",
  padding: 4,
  "&:hover": {
    borderColor: "$black"
  },
  "&[value=purple]": {
    backgroundColor: purple.purple9
  },
  "&[value=green]": {
    backgroundColor: green.green9
  },
  "&[value=yellow]": {
    backgroundColor: yellow.yellow9
  },
  "&[value=blue]": {
    backgroundColor: blue.blue9
  },
  "&[value=red]": {
    backgroundColor: red.red9
  },
  "&[value=orange]": {
    backgroundColor: orange.orange9
  },
  "&[data-state=checked]": {
    padding: 0,
    borderWidth: 5,
    borderColor: "$white"
  }
});

export const ColorPicker = ({...props}) => {
  return (
    <ColorPickerStyled {...props}>
      <ColorPickerItemStyled value="purple"></ColorPickerItemStyled>
      <ColorPickerItemStyled value="green"></ColorPickerItemStyled>
      <ColorPickerItemStyled value="yellow"></ColorPickerItemStyled>
      <ColorPickerItemStyled value="blue"></ColorPickerItemStyled>
      <ColorPickerItemStyled value="red"></ColorPickerItemStyled>
      <ColorPickerItemStyled value="orange"></ColorPickerItemStyled>
    </ColorPickerStyled>
  );
};
