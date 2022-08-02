import { Google, HideSource } from "@mui/icons-material";
import {
  SpeedDial as MuiSpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  styled,
} from "@mui/material";
import { useState } from "react";
import { login } from "../services/auth";

const StyledSpeedDial = styled(MuiSpeedDial)({
  position: "absolute",
  bottom: "0.75rem",
  right: "0.75rem",

  "& .MuiButtonBase-root": {
    border: "2px solid #da8723",
    backgroundColor: "black",

    svg: {
      fill: "#da8723",
    },
  },
});

const SpeedDial = () => {
  const [hidden, setHidden] = useState(false);
  return (
    <StyledSpeedDial
      hidden={hidden}
      ariaLabel="login speed dial"
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction key="1" icon={<Google />} onClick={login} />
      <SpeedDialAction
        key="2"
        icon={<HideSource />}
        onClick={() => setHidden(true)}
      />
    </StyledSpeedDial>
  );
};

export default SpeedDial;
