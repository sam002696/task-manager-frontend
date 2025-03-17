import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Suspense } from "react";
// import Layout from "./layouts/Layout";

import Loader from "./components/ui/Loader";
import routes from "./routes/routes";

const App = () => {
  return (
    <Router>
      {/* <Layout> */}
      <Suspense fallback={<Loader />}>
        <Routes>
          {routes.map(({ path, element, children }, index) => (
            <Route key={index} path={path} element={element}>
              {children?.map(({ path, element }, subIndex) => (
                <Route key={subIndex} path={path} element={element} />
              ))}
            </Route>
          ))}
        </Routes>
      </Suspense>
      {/* </Layout> */}
    </Router>
  );
};

export default App;
