import { Select as MuiSelect, styled } from "@mui/material";
import { ContainerColors } from "../config/layout";

const Select = styled(MuiSelect)({
  ...ContainerColors,
  borderWidth: "1px",
  color: "white",
  height: "56px",
});

export default Select;
