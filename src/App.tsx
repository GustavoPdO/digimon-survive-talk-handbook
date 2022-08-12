import { useState } from "react";
import { Button } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { useAuthState } from "react-firebase-hooks/auth";

import Card, { CardProps } from "./components/Card";
import DigimonModal from "./components/DigimonModal";
import Input from "./components/Input";
import SpeedDial from "./components/SpeedDial";
import { auth } from "./services/firebase";
import { isAdmin } from "./helpers/getAuth";
import useData from "./hooks/useData";
import "./App.css";

function App() {
  const [filter, setFilter] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [selectedDigimon, setSelectedDigimon] = useState<CardProps | undefined>(
    undefined
  );

  const list = (useData(isCreating) || []) as CardProps[];
  const [user] = useAuthState(auth);
  const filteredList = list.filter((item) =>
    item.digimon.toLowerCase().includes(filter.toLowerCase())
  );

  function onAdd() {
    setSelectedDigimon(undefined);
    setIsCreating(true);
  }

  function onEdit(digimon: CardProps) {
    setSelectedDigimon(digimon);
    setIsCreating(true);
  }

  return (
    <>
      <header>
        <img
          className="background-image"
          src="https://p325k7wa.twic.pics/high/digimon/digimon-survive/00-page-setup/V2/digimon-survive-new-header-desktop.jpg?twic=v1/cover=1920/step=10/quality=80"
          alt="digimon survive cover"
        />
        <img
          className="logo"
          src="digimon-digimoncon-logo-white.webp"
          alt="Digimon Survive"
        />
      </header>
      <main>
        <section className="flex-column-alignCenter">
          <Input
            label="Search by name"
            onChange={(e) => setFilter(e.target.value)}
          />
          {isAdmin(user) && (
            <Button
              sx={{ color: "#da8723" }}
              startIcon={<AddCircle sx={{ color: "#da8723" }} />}
              onClick={onAdd}
            >
              Add Digimon
            </Button>
          )}
        </section>
        <section className="flex-column-alignCenter digiList">
          {filteredList.map((digimon) => (
            <Card
              key={digimon.digimon}
              {...digimon}
              onEdit={onEdit}
              isAuthenticated={isAdmin(user)}
            />
          ))}
        </section>
      </main>
      <DigimonModal
        key={selectedDigimon?.id || "none"}
        open={isCreating}
        onClose={() => setIsCreating(false)}
        digimon={selectedDigimon}
      />
      <SpeedDial isAuthenticated={!!user} />
    </>
  );
}

export default App;
