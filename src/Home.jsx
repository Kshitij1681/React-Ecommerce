import React from "react";
import HeroSection from "./components/HeroSection";
import Trusted from "./components/Trusted";
import Services from "./components/Services";
import FeatureProduct from "./components/FeatureProduct";

const Home = () => {
  const data = {
    name: "Developer Store",
  };

  return (
    <>
      <HeroSection myData={data} />
      <FeatureProduct />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
