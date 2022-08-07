import { HideSource, Login } from "@mui/icons-material";
import {
  SpeedDial as MuiSpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  styled,
} from "@mui/material";
import { useState } from "react";
import { LoginModal } from "./LoginModal";
import Modal from "./Modal";

const StyledSpeedDial = styled(MuiSpeedDial)({
  position: "fixed",
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

const SpeedDial = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [hidden, setHidden] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <StyledSpeedDial
        hidden={isAuthenticated || hidden}
        ariaLabel="login speed dial"
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          key="1"
          icon={<Login />}
          title="login"
          onClick={() => setShowModal(true)}
        />
        <SpeedDialAction
          key="2"
          icon={<HideSource />}
          title="close"
          onClick={() => setHidden(true)}
        />
      </StyledSpeedDial>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        content={<LoginModal />}
      />
    </>
  );
};

export default SpeedDial;
