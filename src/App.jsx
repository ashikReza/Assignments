import Nav from "./components/nav";
import Hero from "./components/hero";
import StudentsTable from "./components/studentsTable";
import Footer from "./components/footer";

function App() {
  return (
    <div className="bg-[#172227] font-[Inter] text-white">
      <Nav />
      <Hero />
      <StudentsTable />
      <Footer />
    </div>
  );
}

export default App;
