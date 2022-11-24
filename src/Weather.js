import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import _ from "lodash";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Navbar from "react-bootstrap/Navbar";
import "./Weather.css";

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locs: {},
      search: "",
    };
  }

  getWeatherData = async (location = "Toronto") => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_OW_API}&units=metric`
      )
      .then((res) => {
        this.setState({ locs: res.data });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  locChange = (event) => {
    this.setState({ search: event.target.value });
  };

  locSearch = (event) => {
    this.getWeatherData(this.state.search);
    event.preventDefault();
  };

  componentDidMount = () => {
    this.getWeatherData();
  };

  render() {
    const weather = this.state.locs;
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#">LeWeather</Navbar.Brand>
            <Form className="d-flex" onSubmit={this.locSearch}>
              <Form.Control
                type="text"
                placeholder="Search Location"
                className="me-2"
                aria-label="Search Location"
                onChange={this.locChange}
              />
              <Button variant="primary" type="submit" value="Submit">
                Search
              </Button>
            </Form>
          </Container>
        </Navbar>
        <Container>
          <Card className="text-center weather" border="secondary">
            <Card.Img
              variant="top"
              src={`https://openweathermap.org/img/wn/${_.get(weather.weather, [
                0,
                "icon",
              ])}@2x.png`}
              alt={_.get(weather, "weather.description")}
              style={{ width: "10vh", margin: "auto", padding: "auto" }}
            ></Card.Img>
            <Card.Header as="h2">
              {weather.name}, {_.get(weather.sys, "country")}
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    Current: {_.get(weather, "main.temp")} &#8451;
                  </ListGroup.Item>
                  <ListGroup.Item>
                    High: {_.get(weather, "main.temp_max")} &#8451;
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Low: {_.get(weather, "main.temp_min")} &#8451;
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Feels Like: {_.get(weather, "main.feels_like")} &#8451;
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Humidity: {_.get(weather, "main.humidity")}%
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Pressure: {_.get(weather, "main.pressure")} hPa
                  </ListGroup.Item>
                </ListGroup>
              </Card.Text>
              <Button
                variant="primary"
                href={`https://openweathermap.org/city/${_.get(weather, "id")}`}
              >
                More Info
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }
}
