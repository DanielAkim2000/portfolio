"use client";

import { TitleBlock } from "@/components/block/title.block";
import { BaseCard, handleClick } from "@/components/card/base.card";
import { useState } from "react";

const SectionCardDevOps1 = () => {
  const [isClicked, setIsClicked] = useState([false, false, false, false]);

  return (
    <div className="flex-1">
      <div className="px-6 md:px-12 ml-auto mr-auto max-w-[75rem] mb-6">
        <TitleBlock
          title="Backend (Secure & performant)"
          subtitle="Resilient, Modular & High-Performance Architecture."
          description="Build robust systems with clean logic, optimized for speed, scalability, and security."
        />
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <BaseCard
          index={0}
          title="Architecture"
          description="Modular, layered architecture ensuring maintainability and reusability."
          isClicked={isClicked[0]}
          setIsClicked={() =>
            handleClick({
              index: 0,
              setIsClicked,
              isClicked,
            })
          }
        />
        <BaseCard
          index={1}
          title="Data Flow"
          description="Efficient API and database interaction with clean request/response handling."
          isClicked={isClicked[1]}
          setIsClicked={() =>
            handleClick({
              index: 1,
              setIsClicked,
              isClicked,
            })
          }
        />
        <BaseCard
          index={2}
          title="Security"
          description="Input validation, encryption, and auth protocols to protect data and services."
          isClicked={isClicked[2]}
          setIsClicked={() =>
            handleClick({
              index: 2,
              setIsClicked,
              isClicked,
            })
          }
        />
        <BaseCard
          index={3}
          title="Performance"
          description="Optimized queries, caching, and async processes for lightning-fast execution."
          isClicked={isClicked[3]}
          setIsClicked={() =>
            handleClick({
              index: 3,
              setIsClicked,
              isClicked,
            })
          }
        />
      </div>
    </div>
  );
};

const SectionCardDevOps2 = () => {
  const [isClicked, setIsClicked] = useState([false, false, false, false]);

  return (
    <div className="flex-1">
      <div className="px-6 md:px-12 ml-auto mr-auto max-w-[75rem] mb-6">
        <TitleBlock
          title="DevOps (Reliable & Automated)"
          subtitle="Automated, Scalable & CD Pipelines."
          description="Streamlining infrastructure and CI/CD workflows to support seamless development."
        />
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <BaseCard
          index={0}
          title="Infrastructure as Code"
          description="Declarative configurations using tools like Terraform or CloudFormation."
          isClicked={isClicked[0]}
          setIsClicked={() =>
            handleClick({
              index: 0,
              setIsClicked,
              isClicked,
            })
          }
        />
        <BaseCard
          index={1}
          title="CI/CD Pipelines"
          description="Automated testing, build, and deployment for rapid delivery cycles."
          isClicked={isClicked[1]}
          setIsClicked={() =>
            handleClick({
              index: 1,
              setIsClicked,
              isClicked,
            })
          }
        />
        <BaseCard
          index={2}
          title="Monitoring"
          description="Logging, alerting, and metrics tracking for system reliability."
          isClicked={isClicked[2]}
          setIsClicked={() =>
            handleClick({
              index: 2,
              setIsClicked,
              isClicked,
            })
          }
        />
        <BaseCard
          index={3}
          title="Scalability"
          description="Cloud-native tools and container orchestration for on-demand scaling."
          isClicked={isClicked[3]}
          setIsClicked={() =>
            handleClick({
              index: 3,
              setIsClicked,
              isClicked,
            })
          }
        />
      </div>
    </div>
  );
};
export { SectionCardDevOps1, SectionCardDevOps2 };
