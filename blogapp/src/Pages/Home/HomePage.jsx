import React from "react";
import MainLayout from "../../Components/MainLayout";
import Hero from "../container/Hero";
import Article from "../container/Article";
import CTA from "../container/CTA";
function HomePage() {
  return (
    <>
      <MainLayout>
        <Hero />
        <Article />
        <CTA />
      </MainLayout>
    </>
  );
}

export default HomePage;
