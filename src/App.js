import "./App.css";
// import { Button } from "reactstrap";
import NavExample from "./components/NavExample";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* <p>this is first button</p>
      <div>
        <Button color="danger">Click Me</Button>
      </div> */}

      {/* ////////////////////////////////////////// */}
      <BrowserRouter>
        <NavExample />

        <Routes>
          <Route
            exact
            path="/"
            element={<News key="general" country="in" category="general" />}
          />
          <Route
            exact
            path="/science"
            element={<News key="science" country="in" category="science" />}
          />
          <Route
            exact
            path="/sports"
            element={<News key="sports" country="in" category="sports" />}
          />

          <Route
            exact
            path="/entertainment"
            element={
              <News key="entertainment" country="in" category="entertainment" />
            }
          />

          <Route
            exact
            path="/technology"
            element={
              <News key="technology" country="in" category="technology" />
            }
          />
          <Route
            exact
            path="/health"
            element={<News key="health" country="in" category="health" />}
          />
          <Route
            exact
            path="/business"
            element={<News country="in" category="business" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
