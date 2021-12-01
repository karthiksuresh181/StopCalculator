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
import {
  Container,
  Button,
  UncontrolledPopover,
  PopoverBody,
  PopoverHeader,
} from "reactstrap";

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Button
          color="link"
          id="infoButton"
          data-container="body"
          data-content="Here will be some very useful information about his popover."
          data-placement="top"
        >
          <i className="fa fa-info-circle" />
          <span className="d-lg-none d-md-block">How to Use?</span>
        </Button>
        <UncontrolledPopover placement="top" target="infoButton">
          <PopoverHeader>
            How to use <i className="fa fa-question-circle" />
          </PopoverHeader>
          <PopoverBody>
            <ol>
              <li style={{ color: "black" }}>Enter the Entry Price.</li>
              <li style={{ color: "black" }}>Enter the Stop Price.</li>
              <li style={{ color: "black" }}>
                Click Calculate button to get the results.
              </li>
            </ol>
          </PopoverBody>
          <PopoverHeader>
            Note <i className="fa fa-sticky-note" />
          </PopoverHeader>
          <PopoverBody>
            <ul>
              <li style={{ color: "black" }}>
                Use get price button to get the current price of the ticker.
              </li>
              <li style={{ color: "black" }}>Risk can be changed.</li>
            </ul>
          </PopoverBody>
        </UncontrolledPopover>
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
