import { styled, TextField } from "@mui/material";
import { ContainerWidth } from "../config/layout";

const Input = styled(TextField)({
  ...ContainerWidth,
  "& label": {
    color: "white",

    "&.Mui-focused, &.MuiFormLabel-filled": {
      color: "#da8723",
    },
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset, &:hover fieldset, &.Mui-focused fieldset": {
      borderColor: "#da8723",
    },

    input: {
      color: "white",
    },

    label: {
      color: "#da8723",
    },
  },
});

export default Input;
