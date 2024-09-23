import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WalletProvider } from "./contexts/WalletProvider.tsx";
import { store } from "./redux/store.tsx";
import { Provider } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

createRoot(document.getElementById("root")!).render(
  <WalletProvider>
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <App />
      </Provider>
    </DndProvider>
  </WalletProvider>
);
