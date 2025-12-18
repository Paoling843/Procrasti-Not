import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-center p-3">
       {new Date().getFullYear()} BSIT 3-4
    </footer>
  );
};

export default Footer;
