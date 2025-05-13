"use client";

import { viewsBlog } from "@/actions/views-blog";
import { viewsProject } from "@/actions/views-project";
import { useEffect, useRef } from "react";
import { createLogger } from "@/utils/logger";

const logger = createLogger("ViewsCompte");

interface ViewsCompteProps {
  id: string;
  type: "project" | "blog";
}

// Délai minimal entre deux incrémentations de vues (en heures)
const INTERVAL_HOURS = 1; // Incrémenter max 1 fois par heure

const ViewsCompte = (props: ViewsCompteProps) => {
  // Créer une clé unique pour cette instance du composant
  const instanceKey = `${props.type}_${props.id}`;

  // Référence pour suivre si l'action a déjà été exécutée pendant cette session de page
  // (pour éviter le double appel dans StrictMode ou les remontages)
  const processedInCurrentPageLoad = useRef<Record<string, boolean>>({});

  useEffect(() => {
    // Si on a déjà traité cette instance pendant ce montage de page
    if (processedInCurrentPageLoad.current[instanceKey]) {
      return;
    }

    const viewKey = `${props.type}_${props.id}_viewed`;

    // Vérification de sécurité pour les props invalides
    if (viewKey === "undefined_undefined_viewed" || !props.id || !props.type) {
      logger.warn("Props invalides, annulation");
      return;
    }

    const lastViewedStr = localStorage.getItem(viewKey);
    const now = new Date();

    let shouldIncrementView = false;

    if (!lastViewedStr) {
      // Première visite, incrémenter
      shouldIncrementView = true;
    } else {
      // Vérifier si assez de temps s'est écoulé depuis la dernière visite
      const lastViewed = new Date(lastViewedStr);
      const hoursSinceLastView =
        (now.getTime() - lastViewed.getTime()) / (1000 * 60 * 60);

      if (hoursSinceLastView >= INTERVAL_HOURS) {
        shouldIncrementView = true;
      } else {
        logger.debug(
          `Dernière vue trop récente (${hoursSinceLastView.toFixed(
            2
          )}h), pas d'incrémentation`
        );
      }
    }

    // Dans tous les cas, mettre à jour le timestamp de dernière visite
    localStorage.setItem(viewKey, now.toISOString());

    // Marquer comme traité pour ce chargement de page
    processedInCurrentPageLoad.current[instanceKey] = true;

    // Si on doit incrémenter, appeler l'API
    if (shouldIncrementView) {
      const updateView = async () => {
        logger.info("Incrémentation de la vue pour", props.type, props.id);

        try {
          if (props.type === "project") {
            await viewsProject(props.id);
          } else if (props.type === "blog") {
            await viewsBlog(props.id);
          }
        } catch (error) {
          logger.error("Erreur lors de l'incrémentation:", error);
        }
      };

      updateView();
    }
  }, [props.id, props.type, instanceKey]);

  return null;
};

export default ViewsCompte;
