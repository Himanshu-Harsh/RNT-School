import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { logout } from "./store/slices/authSlice"; // Import logout action
import App from "./App.tsx";
import "./index.css";
import axios from "axios";

// Redux store is already configured with some global settings, 
// and our centralized 'api' instance in src/lib/api.ts handles 
// dynamic URLs and session expiry via interceptors.

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);