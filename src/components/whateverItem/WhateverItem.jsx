import React from "react";
import "./WhateverItem.css";
import { AiOutlineClose } from "react-icons/ai";
import Chatbot from "../Chat/Chatbot";
import navba_02 from "../assets/navbar_02.png";
import navba_03 from "../assets/navbar_03.png";
import navba_04 from "../assets/navbar_04.png";
import navba_05 from "../assets/navbar_05.png";
import navba_06 from "../assets/navbar_06.png";
import navba_07 from "../assets/navbar_07.png";
const WhateverItem = () => {
  return (
    <div className="whateverItem">
      <div className="whateverItem-left">
        <div className="whateverLeft">
          <AiOutlineClose size={60} />
          <AiOutlineClose size={60} />
          <AiOutlineClose size={60} />
          <AiOutlineClose size={60} />
        </div>
        <div className="whateverMid">
          <p className="whateverMid-flash">
            FLASH <br /> SALE
          </p>
          <p style={{ marginTop: "20px" }} className="whateverMid-Up">
            UP TO 50% OFF
          </p>
          <p className="whatevermid-bottom">@Whatever</p>
        </div>

        <div className="whateverRight">
          <AiOutlineClose size={60} />
          <AiOutlineClose size={60} />
          <AiOutlineClose size={60} />
          <AiOutlineClose size={60} />
        </div>
      </div>
      <div className="chatbot">
        <Chatbot />
      </div>
      <div className="whateverBottom">
        <img src={navba_02} alt="" />

        <img src={navba_03} alt="" />
        <img src={navba_04} alt="" />
        <img src={navba_05} alt="" />
        <img src={navba_06} alt="" />
        <img src={navba_07} alt="" />
      </div>
    </div>
  );
};

export default WhateverItem;
