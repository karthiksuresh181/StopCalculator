/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// reactstrap components
import { Container } from "reactstrap";

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        {/* <Nav>
          <NavItem>
            <NavLink href="#">Karthik Suresh</NavLink>
          </NavItem>
        </Nav> */}
        <div className="copyright">
          © {new Date().getFullYear()} made with{" "}
          <i className="tim-icons icon-heart-2" /> by{" "}
          <a href="#" target="_blank">
            Karthik Suresh
          </a>{" "}
          for a simpler trading.
        </div>
      </Container>
    </footer>
  );
}
