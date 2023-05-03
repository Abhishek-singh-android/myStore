import React from 'react'
import HeroSection from './components/HeroSection'
import { useProductContext } from './context/productcontex';

const About = () => {
  // const myName = useContext(AppContext);
  const {myName} = useProductContext();

  const data = {
    name:"About Store",
  } 
  return (
    <>
    {myName}
    <HeroSection myData={data}/>
    </>
  )
}

export default About