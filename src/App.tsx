import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeRoute } from "./routes/HomeRoute";
import { ViewNotepadRoute } from "./routes/ViewNotepadRoute";
import { CreateNotepadRoute } from "./routes/CreateNotepadRoute";
import { EditNotepadRoute } from "./routes/EditNotepadRoute";
import { NotepadPageRoute } from "./routes/NotepadPageRoute";
import { AppBar } from "./components/AppBar";
import { Footer } from "./components/Footer";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <AppBar />
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/criar-notepad" element={<CreateNotepadRoute />} />
          <Route path="/ver-notepad/:id" element={<ViewNotepadRoute />} />
          <Route path="/editar-notepad/:id" element={<EditNotepadRoute />} />
          <Route path="/notepads/:page" element={<NotepadPageRoute />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
