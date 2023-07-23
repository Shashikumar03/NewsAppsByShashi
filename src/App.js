import "./App.css";
import { Button } from "reactstrap";
import NavExample from "./components/NavExample";
import News from "./components/News";

function App() {
  return (
    <>
      <p>this is first button</p>
      <div>
        <Button color="danger">Click Me</Button>
      </div>

      {/* ////////////////////////////////////////// */}
      <NavExample />
      <News country="in" category="sports" />
    </>
  );
}

export default App;
