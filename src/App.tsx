import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const ProjectPage = lazy(() => import("./components/ProjectPage"));
const ProjectsList = lazy(() => import("./components/ProjectsList"));
const Resume = lazy(() => import("./components/Resume"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LoadingProvider>
            <Suspense>
              <MainContainer>
                <Suspense>
                  <CharacterModel />
                </Suspense>
              </MainContainer>
            </Suspense>
          </LoadingProvider>
        }
      />
      <Route
        path="/projects"
        element={
          <Suspense fallback={<div style={{ height: "100vh", background: "#0b080c" }} />}>
            <ProjectsList />
          </Suspense>
        }
      />
      <Route
        path="/projects/:slug"
        element={
          <Suspense fallback={<div style={{ height: "100vh", background: "#0b080c" }} />}>
            <ProjectPage />
          </Suspense>
        }
      />
      <Route
        path="/resume"
        element={
          <Suspense fallback={<div style={{ height: "100vh", background: "#000" }} />}>
            <Resume />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
