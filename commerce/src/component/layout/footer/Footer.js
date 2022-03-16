import React from "react";
import playStore from '../../../images/playstore.png'
import appStore from '../../../images/Appstore.png'
import "./footer.css"

const Footer = (props) => {

  return (
    <footer id="footer">
      <div className="leftFooter">
          <h4>DOWNLOAD OUR APP</h4>
          <p>Download App for Android and Ios phone</p>
          <img  src = {playStore} alt = 'playStore'></img>
          <img  src = {appStore} alt = 'appStore'></img>
      </div>
      <div className="midFooter">
          <h1>ECOMMERCE</h1>
          <p>High quality is our first priority</p>
          <p>Copyright 2022 &copy; Mrster Darko</p>
      </div>
      <div className="rightFooter">
          <h4>Follow Us.</h4>
          <a href = "http://instagram.com">Instagram</a>
          <a href = "http://youtube.com">Youtube</a>
          <a href = "http://facebook.com">Facebook</a>

      </div>
    </footer>
  );
};

export default Footer;
