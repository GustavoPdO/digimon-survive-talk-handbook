import { ExpandMore, Save } from "@mui/icons-material";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  MenuItem,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ContainerColors, ContainerWidth } from "../config/layout";
import { createDigimon, updateDigimon } from "../services/card";
import { CardProps, InnerAccordion, QuestionProps } from "./Card";
import DigimonSummary from "./DigimonSummary";
import Input from "./Input";
import QuestionsList from "./QuestionsList";
import Select from "./Select";

const ContainerBox = styled(Box)({
  ...ContainerWidth,
  ...ContainerColors,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "300px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "16px",

  p: {
    fontSize: "1.2rem",
    color: "#da8723",
    marginTop: "0.5rem",
  },
});

const ActionsBox = styled(Box)({
  display: "flex",
  justifyContent: "right",
  marginTop: "auto",

  svg: {
    fill: "#da8723",
  },
});

interface DigimonModalProps {
  open: boolean;
  onClose: () => void;
  digimon?: CardProps;
}

const DigimonModal = ({ open, onClose, digimon }: DigimonModalProps) => {
  const name = useState("");
  const image = useState<FileList | null>(null);

  const [value, setValue] = useState("0");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  function onSave() {
    console.log(!!question || !!answer)
    if(!question || !answer) return

    const [img] = image

    if (!!digimon) {
      const clonedDigimon = structuredClone(digimon);
      const questionIndex = clonedDigimon.questions.findIndex(
        (item: QuestionProps) => item.question === question
      );
      if (questionIndex > -1) {
        clonedDigimon.questions[questionIndex].answers.push({
          answer,
          value,
        });
      } else {
        clonedDigimon.questions.push({
          question,
          answers: [
            {
              answer,
              value,
            },
          ],
        });
      }
      
      clonedDigimon.img = img ? img[0] : clonedDigimon.img
      updateDigimon(clonedDigimon);
      return onClose();
    }

    const data = {
      digimon: name[0],
      img: img ? img[0] : null,
      questions: [
        {
          question,
          answers: [{ answer, value }],
        },
      ],
    };

    createDigimon(data);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ContainerBox>
        <div>
          <DigimonSummary
            img={digimon?.img || null}
            digimon={digimon?.digimon || ""}
            nameState={name}
            imageState={image}
          />
          <Typography>Questions:</Typography>
          <InnerAccordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Input
                label="Question"
                margin="dense"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </AccordionSummary>
            <AccordionDetails>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.5rem",
                }}
              >
                <Input
                  label="Answer"
                  margin="dense"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <Select
                  value={value}
                  onChange={(e) => setValue(e.target.value as string)}
                >
                  <MenuItem value="-1">-1</MenuItem>
                  <MenuItem value="0">0</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                </Select>
              </div>
            </AccordionDetails>
          </InnerAccordion>
          {digimon?.questions && (
            <QuestionsList questions={digimon.questions} />
          )}
        </div>
        <ActionsBox>
          <IconButton title="Save" onClick={onSave}>
            <Save />
          </IconButton>
        </ActionsBox>
      </ContainerBox>
    </Modal>
  );
};

export default DigimonModal;
