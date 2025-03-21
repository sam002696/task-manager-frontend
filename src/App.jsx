import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Suspense } from "react";

import Loader from "./components/ui/Loader";
import routes from "./routes/routes";

const App = () => {
  return (
    <Router>
      {/* Showing loader while loading */}
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Rendering routes and their children */}
          {routes.map(({ path, element, children }, index) => (
            <Route key={index} path={path} element={element}>
              {children?.map(({ path, element }, subIndex) => (
                <Route key={subIndex} path={path} element={element} />
              ))}
            </Route>
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
