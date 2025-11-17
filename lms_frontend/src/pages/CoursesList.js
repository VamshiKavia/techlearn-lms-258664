import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../api/client";

export default function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let isMounted = true;
    apiGet("/api/v1/courses")
      .then((json) => {
        if (!isMounted) return;
        setCourses(Array.isArray(json.data) ? json.data : []);
      })
      .catch((e) => {
        if (!isMounted) return;
        setErr(e.message || "Failed to load courses");
      })
      .finally(() => isMounted && setLoading(false));
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <p style={{ color: "#374151" }}>Loading courses...</p>;
  if (err) return <p style={{ color: "#EF4444" }}>Error: {err}</p>;

  if (!courses.length) {
    return <p style={{ color: "#374151" }}>No courses available yet.</p>;
  }

  return (
    <section>
      <h1 style={{ color: "#111827", marginBottom: 12 }}>Courses</h1>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {courses.map((c) => (
          <li
            key={c.id}
            style={{
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: 6,
              padding: 12,
              marginBottom: 8,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ margin: 0, color: "#374151" }}>{c.title}</h3>
              <span style={{ fontSize: 12, color: c.published ? "#10B981" : "#9CA3AF" }}>
                {c.published ? "Published" : "Draft"}
              </span>
            </div>
            <p style={{ marginTop: 6, color: "#4B5563" }}>{c.description}</p>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ fontSize: 12, color: "#6B7280" }}>Category: {c.category}</span>
              <Link to={`/courses/${c.id}`} style={{ fontSize: 12, color: "#10B981", textDecoration: "none" }}>
                View details →
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
