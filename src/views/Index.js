import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CustomInput,
  Label,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
  CardFooter,
  CardTitle,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";

const axios = require("axios");

export default function Index() {
  const [entryPrice, setEntryPrice] = React.useState("");
  const [stopPrice, setStopPrice] = React.useState("");
  const [risk, setRisk] = React.useState("20");
  const [stopPercentange, setStopPercentage] = React.useState(0.1);
  const [pairName, setPairName] = React.useState("");
  const [buyQuantity, setBuyQuantity] = React.useState("");
  const [shortPosition, setShortPosition] = React.useState(false);
  const [tp1, settp1] = React.useState("");
  const [tp2, settp2] = React.useState("");
  const [tp3, settp3] = React.useState("");
  const [tp4, settp4] = React.useState("");
  const [tp5, settp5] = React.useState("");

  const [showResult, setShowResult] = React.useState("none");

  const handleGetCurrentPrice = () => {
    if (pairName === "") return;
    axios
      .get(
        `https://www.binance.com/fapi/v1/ticker/price?symbol=${pairName}USDT`
      )
      .then((res) => {
        setEntryPrice(res.data["price"]);
        let _stopPrice = calculateStopPrice(res.data["price"]);
        setStopPrice(_stopPrice);
      });
  };

  const calculateStopPrice = (_entryPrice) => {
    if (shortPosition) {
      _entryPrice = parseFloat(_entryPrice);
      let _stopPrice = _entryPrice * stopPercentange;
      return parseFloat(_entryPrice + _stopPrice).toFixed(4);
    }
    _entryPrice = parseFloat(_entryPrice);
    let _stopPrice = _entryPrice * stopPercentange;
    return parseFloat(_entryPrice - _stopPrice).toFixed(4);
  };

  const calculateBuyQty = () => {
    if (entryPrice === "") return;
    if (stopPrice === "") return;
    if (risk === "") return;
    let qty = parseFloat(risk / Math.abs(entryPrice - stopPrice)).toFixed(5);
    setBuyQuantity(qty);
    calculateTp();
    setShowResult("block");
  };

  const resetPage = () => {
    setEntryPrice("");
    setPairName("");
    setStopPrice("");
    setShowResult("none");
  };

  const calculateTp = () => {
    let stop = entryPrice - stopPrice;
    let _tp1 = parseFloat(entryPrice) + parseFloat(stop);
    let _tp2 = parseFloat(entryPrice) + parseFloat(stop * 2);
    let _tp3 = parseFloat(entryPrice) + parseFloat(stop * 3);
    let _tp4 = parseFloat(entryPrice) + parseFloat(stop * 4);
    let _tp5 = parseFloat(entryPrice) + parseFloat(stop * 5);
    settp1(parseFloat(_tp1).toFixed(4));
    settp2(parseFloat(_tp2).toFixed(4));
    settp3(parseFloat(_tp3).toFixed(4));
    settp4(parseFloat(_tp4).toFixed(4));
    settp5(parseFloat(_tp5).toFixed(4));
  };

  const handleShortPositionSwitch = (e) => {
    setShortPosition(e.target.checked);
  };

  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <div className="">
          <div className="squares square1" />
          <div className="squares square2" />
          <div className="squares square3" />
          {/* <div className="squares square4" /> */}
          <div className="squares square5" />
          <div className="squares square6" />
          <div className="squares square7" />
          <div style={{ height: "100px" }}></div>
          <Container className="align-items-center">
            <Row>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid"
                      src={require("assets/img/bitcoin.png").default}
                    />
                    <h4 className="title">Stop Calculator</h4>
                  </CardHeader>
                  <CardBody>
                    <FormGroup className="text-center">
                      <Row>
                        <Col md="4"></Col>
                        <Col
                          md="5"
                          style={{ paddingTop: "10px" }}
                          id="shortSwitch"
                        >
                          <CustomInput
                            type="switch"
                            label="Short"
                            onChange={handleShortPositionSwitch}
                            id="shortCustomSwitch"
                          ></CustomInput>
                          <UncontrolledTooltip
                            delay={0}
                            placement="top"
                            target="shortSwitch"
                          >
                            Toggle between Long and Short Positions
                          </UncontrolledTooltip>
                        </Col>
                        <Col>
                          <Button
                            className="btn-round btn-icon btn-tooltip"
                            size="sm"
                            onClick={resetPage}
                            id="tooltipReset"
                          >
                            <i className="tim-icons icon-refresh-01" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            placement="right"
                            target="tooltipReset"
                          >
                            Reset Input
                          </UncontrolledTooltip>
                        </Col>
                      </Row>
                      <div style={{ height: "20px" }}></div>
                      <Row>
                        <Col md="1"></Col>
                        <Col md="4" style={{ paddingTop: "10px" }}>
                          <Label className="control-label">USDT Pair</Label>
                        </Col>
                        <Col md="4">
                          <Input
                            placeholder="BTC"
                            type="text"
                            className="text-center"
                            onChange={(e) => setPairName(e.target.value)}
                            value={pairName}
                            style={{ textTransform: "uppercase" }}
                          />
                        </Col>
                        <Col md="1">
                          <Button color="link" onClick={handleGetCurrentPrice}>
                            <i className="fa fa-arrow-circle-down" />
                            <span className="d-lg-none d-md-block">
                              Get Price
                            </span>
                          </Button>
                        </Col>
                      </Row>
                      <div style={{ height: "10px" }}></div>
                      <Row>
                        <Col md="1"></Col>
                        <Col md="4" style={{ paddingTop: "10px" }}>
                          <Label className="control-label">
                            Entry Price ($)
                          </Label>
                        </Col>
                        <Col md="4">
                          <Input
                            placeholder="11.34"
                            type="text"
                            className="text-center"
                            onChange={(e) => setEntryPrice(e.target.value)}
                            value={entryPrice}
                          />
                        </Col>
                      </Row>
                      <div style={{ height: "10px" }}></div>
                      <Row>
                        <Col md="1"></Col>
                        <Col md="4" style={{ paddingTop: "10px" }}>
                          <Label>Stop Price ($)</Label>
                        </Col>
                        <Col md="4">
                          <Input
                            placeholder="10.45"
                            type="text"
                            className="text-center"
                            onChange={(e) => setStopPrice(e.target.value)}
                            value={stopPrice}
                          />
                        </Col>
                      </Row>
                      <div style={{ height: "10px" }}></div>
                      <Row>
                        <Col md="1"></Col>
                        <Col md="4" style={{ paddingTop: "10px" }}>
                          <Label>Risk ($)</Label>
                        </Col>
                        <Col md="4">
                          <Input
                            placeholder="Risk ($)"
                            type="text"
                            className="text-center"
                            onChange={(e) => setRisk(e.target.value)}
                            value={risk}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button color="info" onClick={calculateBuyQty}>
                      Calculate
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="main">
          <div className="section section-basic" id="basic-elements">
            <img
              alt="..."
              className="path"
              src={require("assets/img/path1.png").default}
            />
            <Container style={{ display: showResult }}>
              <Row>
                <Col md="3"></Col>
                <Col md="6">
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h2" className="text-center">
                        Quantity
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <h3 className="text-center">{buyQuantity} </h3>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md="2">
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h3" className="text-center">
                        Stop Loss
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <h4 className="text-center">Price: {stopPrice}$</h4>
                      <h4 className="text-center">Loss: {risk}$</h4>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="2">
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h3" className="text-center">
                        Take Profit 1
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <h4 className="text-center">Price: {tp1}$</h4>
                      <h4 className="text-center">Profit: {risk * 1}$</h4>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="2">
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h3" className="text-center">
                        Take Profit 2
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <h4 className="text-center">Price: {tp2}$</h4>
                      <h4 className="text-center">Profit: {risk * 2}$</h4>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="2">
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h3" className="text-center">
                        Take Profit 3
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <h4 className="text-center">Price: {tp3}$</h4>
                      <h4 className="text-center">Profit: {risk * 3}$</h4>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="2">
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h3" className="text-center">
                        Take Profit 4
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <h4 className="text-center">Price: {tp4}$</h4>
                      <h4 className="text-center">Profit: {risk * 4}$</h4>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="2">
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h3" className="text-center">
                        Take Profit 5
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <h4 className="text-center">Price: {tp5}$</h4>
                      <h4 className="text-center">Profit: {risk * 5}$</h4>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
