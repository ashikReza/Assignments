import Header from "./Header";
import Hero from "./Hero";
import TaskBoard from "./components/taskBoard";
import Footer from "./Footer";

import { TaskProvider } from "./context/context";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <Hero />

      <TaskProvider>
        <TaskBoard />
      </TaskProvider>

      <Footer />

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
