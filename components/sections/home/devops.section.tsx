"use client";

import { TitleBlock } from "@/components/block/title.block";
import { BaseCard, handleClick } from "@/components/card/base.card";
import { useTranslations } from "next-intl";
import { useState } from "react";

const SectionCardDevOps1 = () => {
  const t = useTranslations("home");
  const [isClicked, setIsClicked] = useState([false, false, false, false]);

  return (
    <div className="flex-1">
      <div className="px-6 md:px-12 ml-auto mr-auto max-w-[75rem] mb-6">
        <TitleBlock
          title={t("backend")}
          subtitle={t("resilient_modular_high_performance_architecture")}
          description={t(
            "build_robust_systems_with_clean_logic_optimized_for_speed_scalability_and_security"
          )}
        />
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <BaseCard
          index={0}
          title={t("architecture")}
          description={t(
            "modular_layered_architecture_ensuring_maintainability_and_reusability"
          )}
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
          title={t("data_flow")}
          description={t(
            "efficient_api_and_database_interaction_with_clean_request_response_handling"
          )}
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
          title={t("security")}
          description={t(
            "input_validation_encryption_and_auth_protocols_to_protect_data_and_services"
          )}
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
          title={t("performance")}
          description={t(
            "optimized_queries_caching_and_async_processes_for_lightning_fast_execution"
          )}
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
  const t = useTranslations("home");
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
          title={t("infrastructure_as_code")}
          description={t(
            "declarative_configurations_using_tools_like_terraform_or_cloudformation"
          )}
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
          title={t("ci_cd_pipelines")}
          description={t(
            "automated_testing_build_and_deployment_for_rapid_delivery_cycles"
          )}
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
          title={t("monitoring")}
          description={t(
            "logging_alerting_and_metrics_tracking_for_system_reliability"
          )}
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
          title={t("scalability")}
          description={t(
            "cloud_native_tools_and_container_orchestration_for_on_demand_scaling"
          )}
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
