import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Filter from './filter';
import StudList from './studentlist';

class StudCont extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xl={3} className="top-10">
            <Filter />
          </Col>
          <Col xl={9}>
            <StudList />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default StudCont;
