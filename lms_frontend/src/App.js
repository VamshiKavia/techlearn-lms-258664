import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CoursesList from "./pages/CoursesList";
import CourseDetails from "./pages/CourseDetails";

const navStyle = {
  background: "#F9FAFB",
  borderBottom: "1px solid #E5E7EB",
  padding: "12px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const brandStyle = { color: "#374151", textDecoration: "none", fontWeight: 600 };
const linkStyle = { color: "#374151", textDecoration: "none", marginLeft: 16 };

export default function App() {
  return (
    <div>
      <nav style={navStyle}>
        <Link to="/" style={brandStyle}>
          TechLearn LMS
        </Link>
        <div>
          <Link to="/courses" style={linkStyle}>
            Courses
          </Link>
        </div>
      </nav>
      <main style={{ padding: 16, maxWidth: 960, margin: "0 auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursesList />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
        </Routes>
      </main>
    </div>
  );
}
