import { Routes, Route } from "react-router-dom";
import AddUser from "./components/AddUser";
import GetUser from "./components/GetUser";
import Header from "./components/Header";
import UpdateUser from "./components/UpdateUser";

function Home() {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showUser" element={<GetUser />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/updateUser" element={<UpdateUser />} />
      </Routes>
    </div>
  );
}

export default App;