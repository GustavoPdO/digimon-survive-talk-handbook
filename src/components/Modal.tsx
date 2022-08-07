import { Box, Modal as MuiModal, styled } from "@mui/material";
import { ContainerColors, ContainerWidth } from "../config/layout";

const ContainerBox = styled(Box)({
  ...ContainerWidth,
  ...ContainerColors,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  maxHeight: "90vh",
  overflowY: "auto",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "16px",

  ".MuiTypography-body1": {
    fontSize: "1.2rem",
    color: "#da8723",
    marginTop: "0.5rem",
  },

  svg: {
    fill: "#da8723",
  },
});

const ActionsBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  paddingBottom: "0.5rem",

  svg: {
    fill: "#da8723",
  },
});

interface ModalProps {
  open: boolean;
  onClose: () => void;
  actions?: React.ReactNode;
  content: React.ReactNode;
}

const Modal = ({ open, onClose, actions, content }: ModalProps) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <ContainerBox>
        {actions && <ActionsBox>{actions}</ActionsBox>}
        <div>{content}</div>
      </ContainerBox>
    </MuiModal>
  );
};

export default Modal;
