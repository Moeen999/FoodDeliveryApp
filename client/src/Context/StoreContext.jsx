import { createContext } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);
const ContextProvider = (props) => {
  const contextValues = {
    food_list,
  };
  return (
    <StoreContext.Provider value={contextValues}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default ContextProvider;
