import { Button } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import "./App.css";
import Input from "./components/Input";
import Card, { CardProps } from "./components/Card";
import React, { useEffect, useState } from "react";
import DigimonModal from "./components/DigimonModal";
import { getDigimons } from "./services/card";

function App() {
  const [list, setList] = useState<CardProps[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedDigimon, setSelectedDigimon] = useState<CardProps | undefined>(
    undefined
  );

  function onFilter(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length < 1) return setList([]);
    setList(
      list.filter((item) =>
        item.digimon.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  }

  function onAdd() {
    setSelectedDigimon(undefined);
    setIsCreating(true);
  }

  function onEdit(digimon: CardProps) {
    setSelectedDigimon(digimon);
    setIsCreating(true);
  }

  useEffect(() => {
    async function getData() {
      const response = await getDigimons();
      setList(response);
    }

    getData();
  }, [isCreating]);

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
          <Input label="Search by name" onChange={onFilter} />
          <Button
            sx={{ color: "#da8723" }}
            startIcon={<AddCircle sx={{ color: "#da8723" }} />}
            onClick={onAdd}
          >
            Add Digimon
          </Button>
        </section>
        <section className="flex-column-alignCenter digiList">
          {list.map((digimon) => (
            <Card key={digimon.digimon} {...digimon} onEdit={onEdit} />
          ))}
        </section>
      </main>
      <DigimonModal
        open={isCreating}
        onClose={() => setIsCreating(false)}
        digimon={selectedDigimon}
      />
    </>
  );
}

export default App;
