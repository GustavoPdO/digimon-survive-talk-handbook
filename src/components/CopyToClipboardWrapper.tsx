import { Alert, Box, Snackbar, styled, Typography } from "@mui/material";
import { useState } from "react";

const StyledBox = styled(Box)({
  display: "contents",
});

const StyledSnackbar = styled(Snackbar)({
  ".MuiPaper-root": {
    background: "#111",
    border: "1px solid #da8723",
  },

  ".MuiSnackbarContent-root": {
    justifyContent: "center",
  },

  ".MuiAlert-message": {
    color: "white",
  },
});

interface CopyToClipboardWrapperProps {
  children: string;
}

const CopyToClipboardWrapper = ({ children }: CopyToClipboardWrapperProps) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  async function copyTextToClipboard(text: string) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  function onClick() {
    if (children) {
      copyTextToClipboard(children)
        .then(() => {
          setShowSnackbar(true);
        })
        .catch((error) => console.error(error));
    }
  }

  return (
    <>
      <StyledBox onClick={onClick}>
        <Typography>{children}</Typography>
      </StyledBox>
      <StyledSnackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={1200}
      >
        <Alert severity="success">Text copied to clipboard</Alert>
      </StyledSnackbar>
    </>
  );
};

export default CopyToClipboardWrapper;
