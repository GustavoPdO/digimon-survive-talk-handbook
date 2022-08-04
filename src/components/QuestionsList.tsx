import { ExpandMore } from "@mui/icons-material";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  styled,
  Typography,
} from "@mui/material";
import { InnerAccordion } from "./Card";
import CopyToClipboardWrapper from "./CopyToClipboardWrapper";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",

  "p + p": {
    paddingRight: "0.5rem",
  },
});

interface QuestionsListProps {
  questions: Array<{
    question: string;
    answers: Array<{
      answer: string;
      value: string;
    }>;
  }>;
  isEditing?: boolean;
}

const QuestionsList = ({ questions, isEditing }: QuestionsListProps) => {
  return (
    <>
      {questions.map(({ question, answers }, index) => (
        <InnerAccordion key={`${question}-${index}`}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            {isEditing ? (
              <CopyToClipboardWrapper>{question}</CopyToClipboardWrapper>
            ) : (
              <Typography>{question}</Typography>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <div className="responses-container">
              {answers.map(({ answer, value }) => (
                <StyledBox key={`${answer}=${value}`}>
                  <p>{answer}:</p>
                  <p>{value}</p>
                </StyledBox>
              ))}
            </div>
          </AccordionDetails>
        </InnerAccordion>
      ))}
    </>
  );
};

export default QuestionsList;
