import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/home.component';
import Resume from './pages/resume.component';
import About from './pages/about.component';
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/:uniqueId" element={<Resume />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
