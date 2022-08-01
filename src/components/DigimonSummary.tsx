import { Avatar, Box, IconButton, styled, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import Input from "./Input";

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

interface DigimonSummaryProps {
  img: string | undefined;
  digimon: string;
  nameState?: [string, Dispatch<SetStateAction<string>>];
  imageState?: [string, Dispatch<SetStateAction<string>>];
}

const DigimonSummary = ({
  img,
  digimon,
  nameState,
  imageState,
}: DigimonSummaryProps) => {
  return (
    <StyledBox>
      {!!img ? (
        <Avatar src={img} />
      ) : (
        <IconButton aria-label="upload image" component="label">
          {imageState && (
            <input
              hidden
              accept="image/*"
              type="file"
              value={imageState[0]}
              onChange={(e) => imageState[1](e.target.value)}
            />
          )}
          <Avatar src="/agumon-silhouette.jpg" />
        </IconButton>
      )}
      {!!digimon ? (
        <Typography>{digimon}</Typography>
      ) : (
        nameState && (
          <Input
            label="Name"
            value={nameState[0]}
            onChange={(e) => nameState[1](e.target.value)}
          />
        )
      )}
    </StyledBox>
  );
};

export default DigimonSummary;
