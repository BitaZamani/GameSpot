import React from "react";
import { NavLink } from "react-router-dom";
import Button from "./components/UI/button";
import Card from "./components/UI/card/card";

const HomePage = () => {
  const number2 = (
    <svg
      fill="#fddc3e"
      viewBox="0 0 256 256"
      width="80"
      height="80"
      id="Flat"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#fddc3e"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M208,32H48A16.01833,16.01833,0,0,0,32,48V208a16.01833,16.01833,0,0,0,16,16H208a16.01833,16.01833,0,0,0,16-16V48A16.01833,16.01833,0,0,0,208,32ZM152,167.99414a8,8,0,0,1,0,16H104.31738c-.10644.0044-.21191.00635-.31836.00635a8.00251,8.00251,0,0,1-6.30078-12.93164L141.37012,112.793a16.0039,16.0039,0,1,0-28.11621-15.01856A8,8,0,1,1,98.51758,91.542a32.00411,32.00411,0,1,1,56.01269,30.35547c-.07324.10791-.14843.21436-.22754.31836l-34.30566,45.77832Z"></path>{" "}
      </g>
    </svg>
  );
  const bomb = (
    <svg
      viewBox="0 0 16 16"
      width="80"
      height="80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M15.9569 1.45706L14.539 2.87495L13.1248 1.45706L14.5427 0.0428467L15.9569 1.45706Z"
          fill="#000000"
        ></path>{" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.707 5.707L13.123 4.29101L14.5354 5.70706L15.9532 4.28917L14.539 2.87495L13.123 4.28733L11.7106 2.87495L10.2928 4.29279L9 3L7.74293 4.25707C7.19135 4.08989 6.60617 4 6 4C2.68629 4 0 6.68629 0 10C0 13.3137 2.68629 16 6 16C9.31371 16 12 13.3137 12 10C12 9.39383 11.9101 8.80865 11.7429 8.25707L13 7L11.707 5.707ZM6 8C4.89543 8 4 8.89543 4 10H2C2 7.79086 3.79086 6 6 6V8Z"
          fill="#000000"
        ></path>{" "}
        <path
          d="M11.7107 0.0428467L13.1248 1.45706L11.707 2.87495L10.2928 1.45706L11.7107 0.0428467Z"
          fill="#000000"
        ></path>{" "}
      </g>
    </svg>
  );
  return (
    <div className="min-h-screen">
      <div className="page-container">
        <section className="pt-10">
          <h2 className="text-center text-3xl my-7 ">Ready To Play?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-14 max-w-[400px] sm:max-w-[800px] mx-auto">
            <NavLink to={"/2048"}>
              <Card icon={number2}>2048</Card>
            </NavLink>
            <NavLink to={"/MineSweeper"}>
              <Card icon={bomb}>
                <span>Mine Sweeper</span>
              </Card>
            </NavLink>
          </div>
        </section>
      </div>
      <div className="absolute bottom-0 left-0 -translate-y-1/2 w-full text-center text-orange-950">
        Created By{" "}
        <a href="https://github.com/BitaZamani" className="text-orange-400">
          Bita Zamani
        </a>
      </div>
    </div>
  );
};

export default HomePage;
