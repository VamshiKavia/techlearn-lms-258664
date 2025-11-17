import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section>
      <h1 style={{ color: "#111827", marginBottom: 8 }}>Welcome to TechLearn LMS</h1>
      <p style={{ color: "#374151" }}>
        Explore our technology courses across Full-Stack, Data Science, AI, Cloud, DevOps and more.
      </p>
      <p style={{ marginTop: 16 }}>
        <Link to="/courses" style={{ color: "#10B981", textDecoration: "none" }}>
          Browse Courses →
        </Link>
      </p>
    </section>
  );
}
