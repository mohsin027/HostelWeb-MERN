import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className="footer1 bg-dark text-light text-center py-3">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} HostelWeb. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

