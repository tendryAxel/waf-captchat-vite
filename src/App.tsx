import Form from "./components/Form.tsx";
import {useEffect} from "react";
import {loadScript} from "./captchat.ts";

function App() {
    useEffect(() => {
        loadScript(import.meta.env.VITE_URL2)
    }, [import.meta.env.VITE_URL2])

  return (
      <div>
          <Form />
      </div>
  )
}

export default App
