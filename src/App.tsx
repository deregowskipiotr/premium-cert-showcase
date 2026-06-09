import { useState } from "react";
import MainPage from "./components/MainPage";
import SupplementPage from "./components/SupplementPage";

const App = () => {
  const [view, setView] = useState<"main" | "supplement">("main");

  if (view === "supplement") {
    return <SupplementPage onBack={() => setView("main")} />;
  }

  return <MainPage onViewSupplement={() => setView("supplement")} />;
};

export default App;
