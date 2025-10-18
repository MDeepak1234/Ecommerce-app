import React from "react";
import about from "../assets/frontend_assets/about_img.png";
import News from "../Componenets/News";
import Title from "../Componenets/Title";

const About = () => {
  return (
    <div className="items-center gap-2 justify-center sm:justify-start">

      <div className="flex items-center gap-2 mb-6 text-3xl mt-8 justify-center">
        <Title text1={"About"} text2={"Us"}/>
      </div>

      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 mb-10">
        <div>
          <img className="w-1000 " src={about} alt="About" />
        </div>
        <div className="text-sm gap-14 my-10 mt-10 sm:mt-0">
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae eveniet debitis quibusdam quam quae, voluptas eaque accusamus velit hic rerum molestias vero dolorem in sequi eius optio! Voluptatibus, harum autem? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus id, repellendus ab nam dolorem vitae. Assumenda corporis autem voluptas repellendus magnam velit! Odit, officiis hic molestiae distinctio quisquam praesentium ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ex excepturi corrupti doloremque iure porro laborum, dolorem tempore incidunt sequi placeat ullam quam error pariatur in voluptatem maiores quis nisi?
          </p>

          <p className="w-full md:w-2/3 text-gray-950 text-2xl font-bold mt-5">
            On Mission
          </p>
          <p className="w-full md:w-2/3 text-gray-600 mt-5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus odio sed dolorem saepe ea excepturi aperiam, quasi autem maiores harum ducimus consequuntur nostrum est quaerat! Nostrum quo natus modi corrupti?
          </p>
        </div>
      </div>

      <News />
    </div>
  );
};

export default About;
