"use client";

import LoginForm from "../components/LoginForm";

export default function Page() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <LoginForm />
    </div>
  );
}
