import { Check } from "@mui/icons-material";
import { Box, IconButton, styled, Typography } from "@mui/material";
import { useState } from "react";
import { login } from "../services/auth";
import Input from "./Input";

const LastRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const Text = styled(Typography)({
  marginBottom: "1rem",
});

export const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onLogin() {
    const data = {
      email,
      password,
    };

    login(data);
  }

  return (
    <div>
      <Text variant="body2">
        This login modal is intended only for this application creator so he can
        add new entries.
      </Text>
      <Input
        label="email"
        type="email"
        margin="dense"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <LastRow>
        <Input
          label="password"
          type="password"
          margin="dense"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <IconButton onClick={onLogin}>
          <Check />
        </IconButton>
      </LastRow>
    </div>
  );
};
