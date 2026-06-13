import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import OAuthRedirectPage from "./pages/OAuthRedirectPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/oauth2/redirect"
          element={
            <OAuthRedirectPage
              onLoginSuccess={() => (window.location.href = "/")}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}