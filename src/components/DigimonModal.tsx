import { Close, ExpandMore, Save } from "@mui/icons-material";
import {
  AccordionDetails,
  AccordionSummary,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { createDigimon, updateDigimon } from "../services/card";
import { CardProps, InnerAccordion, QuestionProps } from "./Card";
import DigimonSummary from "./DigimonSummary";
import Input from "./Input";
import Modal from "./Modal";
import QuestionsList from "./QuestionsList";
import Select from "./Select";

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
    if (!question || !answer) return;

    const [img] = image;
    const trimmedQuestion = question.trim();
    setQuestion("");
    setAnswer("");

    if (!!digimon) {
      const clonedDigimon = structuredClone(digimon);
      const questionIndex = clonedDigimon.questions.findIndex(
        (item: QuestionProps) => item.question === trimmedQuestion
      );
      if (questionIndex > -1) {
        clonedDigimon.questions[questionIndex].answers.push({
          answer,
          value,
        });
      } else {
        clonedDigimon.questions.push({
          question: trimmedQuestion,
          answers: [
            {
              answer,
              value,
            },
          ],
        });
      }

      clonedDigimon.img = img ? img[0] : clonedDigimon.img;
      updateDigimon(clonedDigimon);
      return onClose();
    }

    const data = {
      digimon: name[0],
      img: img ? img[0] : null,
      questions: [
        {
          question: trimmedQuestion,
          answers: [{ answer, value }],
        },
      ],
    };

    createDigimon(data);
    return onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      actions={
        <>
          <IconButton title="Close" onClick={onClose}>
            <Close />
          </IconButton>
          <IconButton title="Save" onClick={onSave}>
            <Save />
          </IconButton>
        </>
      }
      content={
        <>
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
                  <MenuItem value="-2">-2</MenuItem>
                  <MenuItem value="-1">-1</MenuItem>
                  <MenuItem value="0">0</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                </Select>
              </div>
            </AccordionDetails>
          </InnerAccordion>
          {digimon?.questions && (
            <QuestionsList questions={digimon.questions} isEditing={true} />
          )}
        </>
      }
    />
  );
};

export default DigimonModal;
