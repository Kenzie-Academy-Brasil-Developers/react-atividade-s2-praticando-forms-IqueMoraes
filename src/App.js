import "./App.css";
import Form from "./components/form";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {
  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
