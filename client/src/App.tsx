import { Routes, Route } from "react-router-dom";
import AddUser from "./components/AddUser";
import DeleteUser from "./components/DeleteUser";
import GetUser from "./components/GetUser";
import Header from "./components/Header/Header";
import UpdateUser from "./components/UpdateUser";
import Home from "./Pages/Home";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showUser" element={<GetUser />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/updateUser" element={<UpdateUser />} />
        <Route path="/deleteUser" element={<DeleteUser />} />
      </Routes>
    </div>
  );
}

export default App;