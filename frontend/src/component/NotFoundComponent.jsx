import React from "react";
import "./../assets/css/NotFoundComponent.css";
import image from "./../assets/img/notFound.png"

export default function NotFoundComponent() {
  return (
    <div className="container-comp">
      <img src={image}></img>
    </div>
  );
}