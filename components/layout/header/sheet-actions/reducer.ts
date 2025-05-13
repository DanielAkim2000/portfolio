import {
  ActionCenterState,
  Action,
} from "@/hooks/actions-center/useActonCenterData";
import { createLogger } from "@/utils/logger";

const logger = createLogger("HeaderSheet");

// reducer pour la gestion des états
export const reducer = (
  state: ActionCenterState,
  action: Action
): ActionCenterState => {
  switch (action.type) {
    case "SET_REACTION_DATA":
      logger.debug("SET_REACTION_DATA", action.payload);
      return { ...state, reactionData: action.payload };
    case "SET_SHARE_DATA":
      logger.debug("SET_SHARE_DATA", action.payload);
      return { ...state, shareData: action.payload };
    case "SET_REACTIONS":
      logger.debug("SET_REACTIONS", action.payload);
      return { ...state, reactions: action.payload };
    default:
      return state;
  }
};
