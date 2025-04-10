"use client";

import { DevopsCard } from "@/components/card/devops.card";
import { useState } from "react";

const SectionCardDevOps1 = () => {
  const [isClicked, setIsClicked] = useState([false, false, false, false]);

  const handleClick = (index: number) => {
    if (isClicked[index]) {
      return;
    }
    setIsClicked((prevState) =>
      prevState.map((item, idx) => (idx === index ? !item : item))
    );
  };

  return (
    <div>
      <DevopsCard
        index={0}
        title="Architecture"
        description="Modular, layered architecture ensuring maintainability and reusability."
        isClicked={isClicked[0]}
        setIsClicked={() => handleClick(0)}
      />
      <DevopsCard
        index={1}
        title="Data Flow"
        description="Efficient API and database interaction with clean request/response handling."
        isClicked={isClicked[1]}
        setIsClicked={() => handleClick(1)}
      />
      <DevopsCard
        index={2}
        title="Security"
        description="Input validation, encryption, and auth protocols to protect data and services."
        isClicked={isClicked[2]}
        setIsClicked={() => handleClick(2)}
      />
      <DevopsCard
        index={3}
        title="Performance"
        description="Optimized queries, caching, and async processes for lightning-fast execution."
        isClicked={isClicked[3]}
        setIsClicked={() => handleClick(3)}
      />
    </div>
  );
};

export default SectionCardDevOps1;
