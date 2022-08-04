import { Avatar, Box, IconButton, styled, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import Input from "./Input";

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

interface DigimonSummaryProps {
  img: string | null;
  digimon: string;
  nameState?: [string, Dispatch<SetStateAction<string>>];
  imageState?: [FileList | null, Dispatch<SetStateAction<FileList | null>>];
}

const DigimonSummary = ({
  img,
  digimon,
  nameState,
  imageState,
}: DigimonSummaryProps) => {
  function onUpload(files: FileList | null) {
    if (files === null || imageState === undefined) return;
    imageState[1](files);
  }

  function renderAvatar() {
    if (!!img) {
      return <Avatar src={img} />;
    }
    if (!!imageState) {
      return (
        <IconButton aria-label="upload image" component="label">
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => onUpload(e.target.files)}
          />
          <Avatar
            src={
              imageState[0]
                ? URL.createObjectURL(imageState[0][0])
                : "/agumon-silhouette.jpg"
            }
          />
        </IconButton>
      );
    }

    return <Avatar src={"/agumon-silhouette.jpg"} />;
  }

  return (
    <StyledBox>
      {renderAvatar()}
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
