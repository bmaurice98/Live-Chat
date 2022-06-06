import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Homepage, ChatPage } from "./Pages";

function App() {
  return (
    <div className="min-h-screen flex bg-aurora bg-cover bg-center">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
