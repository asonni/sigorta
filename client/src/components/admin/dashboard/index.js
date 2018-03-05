import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Row,
  Col,
  Card,
  Button,
  CardBody,
  CardTitle,
  ButtonGroup,
  ButtonToolbar
} from 'reactstrap';

const brandSuccess = '#4dbd74';
const brandInfo = '#63c2de';
const brandDanger = '#f86c6b';

// convert Hex to RGBA
function convertHex(hex, opacity) {
  hex = hex.replace('#', '');
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
  return result;
}

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: [
    'M',
    'T',
    'W',
    'T',
    'F',
    'S',
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S',
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S',
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S',
    'S'
  ],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: convertHex(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2
    },
    {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3
    }
  ]
};

const mainChartOpts = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }
    ]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  }
};

class Dashboard extends Component {
  state = {
    dropdownOpen: false,
    radioSelected: 2
  };

  componentWillMount() {
    document.title = 'Sigorta | Dashboard';
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  onRadioBtnClick = radioSelected => {
    this.setState({
      radioSelected: radioSelected
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <h4 className="mb-0">9.823</h4>
                <p>Total Users</p>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <h4 className="mb-0">9.823</h4>
                <p>Total Clients</p>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <h4 className="mb-0">9.823</h4>
                <p>Total Plans</p>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <h4 className="mb-0">9.823</h4>
                <p>Total Orders</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Sales Traffic</CardTitle>
                    <div className="small text-muted">November 2018</div>
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block">
                    <ButtonToolbar
                      className="float-right"
                      aria-label="Toolbar with button groups"
                    >
                      <ButtonGroup className="mr-3" aria-label="First group">
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(1)}
                          active={this.state.radioSelected === 1}
                        >
                          Day
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(2)}
                          active={this.state.radioSelected === 2}
                        >
                          Month
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(3)}
                          active={this.state.radioSelected === 3}
                        >
                          Year
                        </Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col>
                </Row>
                <div
                  className="chart-wrapper"
                  style={{ height: 300 + 'px', marginTop: 40 + 'px' }}
                >
                  <Line data={mainChart} options={mainChartOpts} height={300} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
