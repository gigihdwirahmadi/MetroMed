import React from "react";
import "./../assets/css/LoadingComponent.css";

export default function loadingComponent() {
  return (
    <div className="spinner-container">
      <span className="loader"></span>
    </div>
  );
}