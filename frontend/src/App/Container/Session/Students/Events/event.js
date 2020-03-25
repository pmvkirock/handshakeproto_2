import React from 'react';
import { Container, Row } from 'react-bootstrap';

class Job extends React.Component {
  render() {
    return (
      <Row>
        <Container className={'job-listing left-10 ' + this.props.show}>
          <h6>{this.props.event_name}</h6>
          <p>
            {this.props.company_name} - {this.props.location}, CA
          </p>
          <p className="intern-type">
            {this.props.date} - {this.props.eligibility}
          </p>
        </Container>
      </Row>
    );
  }
}

export default Job;
