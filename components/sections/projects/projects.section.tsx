"use client";

import { BaseCard, handleClick } from "@/components/card/base.card";
import { useState } from "react";

export type SectionProjectsProps = {};

export const SectionProjects = (props: SectionProjectsProps) => {
  const [isClicked, setIsClicked] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 mb-6 mt-10">
      <BaseCard
        index={0}
        title="Zoho Integration"
        description="Integrate Zoho using Python to fetch user information to perform Oauth2"
        isClicked={isClicked[0]}
        setIsClicked={() => {
          handleClick({ index: 0, setIsClicked, isClicked });
        }}
        link="/projects/zoho-integration"
      />
      <BaseCard
        index={1}
        title="Zoho Integration"
        description="Integrate Zoho using Python to fetch user information to perform Oauth2"
        isClicked={isClicked[1]}
        setIsClicked={() => {
          handleClick({ index: 1, setIsClicked, isClicked });
        }}
        link="/projects/zoho-integration"
      />
      <BaseCard
        index={2}
        title="Zoho Integration"
        description="Integrate Zoho using Python to fetch user information to perform Oauth2"
        isClicked={isClicked[2]}
        setIsClicked={() => {
          handleClick({ index: 2, setIsClicked, isClicked });
        }}
        link="/projects/zoho-integration"
      />
      <BaseCard
        index={3}
        title="Zoho Integration"
        description="Integrate Zoho using Python to fetch user information to perform Oauth2"
        isClicked={isClicked[3]}
        setIsClicked={() => {
          handleClick({ index: 3, setIsClicked, isClicked });
        }}
        link="/projects/zoho-integration"
      />
      <BaseCard
        index={4}
        title="Zoho Integration"
        description="Integrate Zoho using Python to fetch user information to perform Oauth2"
        isClicked={isClicked[4]}
        setIsClicked={() => {
          handleClick({ index: 4, setIsClicked, isClicked });
        }}
        link="/projects/zoho-integration"
      />
      <BaseCard
        index={5}
        title="Zoho Integration"
        description="Integrate Zoho using Python to fetch user information to perform Oauth2"
        isClicked={isClicked[5]}
        setIsClicked={() => {
          handleClick({ index: 5, setIsClicked, isClicked });
        }}
        link="/projects/zoho-integration"
      />
    </div>
  );
};
