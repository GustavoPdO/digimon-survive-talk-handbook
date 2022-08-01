import { Edit, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  styled,
} from "@mui/material";
import { ContainerColors, ContainerWidth } from "../config/layout";
import DigimonSummary from "./DigimonSummary";
import QuestionsList from "./QuestionsList";

const StyledAccordion = styled(Accordion)({
  ...ContainerWidth,
  ...ContainerColors,

  ".MuiAccordionSummary-content": {
    p: {
      textTransform: "Capitalize",
    },
  },

  svg: {
    fill: "#da8723",
  },
});

export const InnerAccordion = styled(Accordion)({
  background: "#222",
  borderBottom: "1px solid #da8723",
  borderRadius: "0 !important",
  color: "#da8723",
  boxShadow: "none",

  "& .Mui-expanded": {
    minHeight: "32px",
  },

  ".MuiAccordionSummary-content": {
    margin: 0,
    p: {
      marginLeft: "0",
    },
  },

  svg: {
    fill: "#da8723",
  },
});

export type QuestionProps = {
  question: string;
  answers: Array<{
    answer: string;
    value: string;
  }>;
};

export interface CardProps {
  id: string;
  digimon: string;
  img?: string;
  questions: QuestionProps[];
  onEdit?: (digimon: CardProps) => void;
}

const Card = ({ id, digimon, img, questions, onEdit }: CardProps) => {
  return (
    <StyledAccordion>
      <AccordionSummary
        aria-controls={`${digimon}-panel-content`}
        expandIcon={<ExpandMore />}
      >
        <DigimonSummary img={img} digimon={digimon} />
      </AccordionSummary>
      <AccordionDetails>
        <QuestionsList questions={questions} />
      </AccordionDetails>
      {!!onEdit && (
        <AccordionActions>
          <IconButton onClick={() => onEdit({ id, digimon, img, questions })}>
            <Edit />
          </IconButton>
        </AccordionActions>
      )}
    </StyledAccordion>
  );
};

export default Card;
