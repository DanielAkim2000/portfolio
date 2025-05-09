import {
  ActionCenterState,
  Action,
} from "@/hooks/actions-center/useActonCenterData";

// reducer pour la gestion des états
export const reducer = (
  state: ActionCenterState,
  action: Action
): ActionCenterState => {
  switch (action.type) {
    case "SET_REACTION_DATA":
      console.log("[HeaderSheet] SET_REACTION_DATA", action.payload);
      return { ...state, reactionData: action.payload };
    case "SET_SHARE_DATA":
      console.log("[HeaderSheet] SET_SHARE_DATA", action.payload);
      return { ...state, shareData: action.payload };
    case "SET_REACTIONS":
      console.log("[HeaderSheet] SET_REACTIONS", action.payload);
      return { ...state, reactions: action.payload };
    default:
      return state;
  }
};
