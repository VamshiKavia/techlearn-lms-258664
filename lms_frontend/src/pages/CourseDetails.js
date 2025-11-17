import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiGet } from "../api/client";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let isMounted = true;
    apiGet(`/api/v1/courses/${id}`)
      .then((json) => {
        if (!isMounted) return;
        setCourse(json.data);
      })
      .catch((e) => {
        if (!isMounted) return;
        setErr(e.message || "Failed to load course");
      })
      .finally(() => isMounted && setLoading(false));
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <p style={{ color: "#374151" }}>Loading course...</p>;
  if (err) return <p style={{ color: "#EF4444" }}>Error: {err}</p>;
  if (!course) return <p style={{ color: "#374151" }}>Course not found.</p>;

  return (
    <section>
      <p>
        <Link to="/courses" style={{ color: "#10B981", textDecoration: "none" }}>
          ← Back to courses
        </Link>
      </p>
      <h1 style={{ color: "#111827" }}>{course.title}</h1>
      <p style={{ color: "#4B5563" }}>{course.description}</p>
      <p style={{ color: "#6B7280", fontSize: 14 }}>Category: {course.category}</p>
      <p style={{ color: course.published ? "#10B981" : "#9CA3AF", fontSize: 14 }}>
        {course.published ? "Published" : "Draft"}
      </p>
    </section>
  );
}
