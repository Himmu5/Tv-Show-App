import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import PeopleSearchPage from "./Pages/PeopleSearch.Page";
import ShowDetailPage from "./Pages/ShowDetails.Page";
import ShowListPage from "./Pages/ShowsList.Page";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <NavBar />
        <Routes>
          <Route path="/" element={<ShowListPage />} />
          <Route path="/people" element={<PeopleSearchPage />} />
          <Route path="/show/:showId" element={<ShowDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
