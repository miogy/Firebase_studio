import React from "react";

function Banner() {
  return (
    <section className="h-96 bg-yellow-900 relative">
      <div className="w-full h-full bg-cover bg-banner opacity-80"></div>
      <div className="absolute w-full top-32 text-center text-white">
        <h2 className="text-6xl">MIOGY ARTWORK STUDIO</h2>
        <p className="text-2xl">Best Design, Hign Quality</p>
      </div>
    </section>
  );
}

export default Banner;
