"use client";

import { BaseCard, handleClick } from "@/components/card/base.card";
import { Content, Project, Title } from "@/prisma/generated";
import { useState } from "react";

export type SectionProjectsProps = {
  projects: (Project & { title: Title[]; description: Content[] })[];
  locale: string;
};

export const SectionProjects = (props: SectionProjectsProps) => {
  const [isClicked, setIsClicked] = useState(
    Array(props.projects.length).fill(false)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 mb-6 mt-10">
      {props.projects.map((project, index) => (
        <BaseCard
          key={project.id}
          index={index}
          title={
            project.title.find((t) => t.locale === props.locale)
              ?.title as string
          }
          description={
            project.title.find((d) => d.locale === props.locale)
              ?.description as string
          }
          isClicked={isClicked[index]}
          setIsClicked={() => {
            handleClick({ index: index, setIsClicked, isClicked });
          }}
          link={`projects/${project.id}`}
        />
      ))}
    </div>
  );
};
