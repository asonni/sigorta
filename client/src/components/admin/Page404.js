import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

class Page404 extends Component {
  render() {
    return (
      <Container className="pt-5">
        <Row className="justify-content-center pt-5">
          <Col md="6" className="pt-5">
            <div className="clearfix pt-5">
              <h1 className="float-left display-3 mr-4">404</h1>
              <h4 className="pt-3">Oops! You're lost.</h4>
              <p className="text-muted float-left">
                The page you are looking for was not found.
              </p>
            </div>
            {/* <InputGroup className="input-prepend">
                <InputGroupAddon>
                  <i className="fa fa-search" />
                </InputGroupAddon>
                <Input
                  size="16"
                  type="text"
                  placeholder="What are you looking for?"
                />
                <InputGroupButton>
                  <Button color="info">Search</Button>
                </InputGroupButton>
              </InputGroup> */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Page404;
