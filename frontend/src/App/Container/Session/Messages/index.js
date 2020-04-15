import React from 'react';
import { Container } from 'react-bootstrap';

import JobCont from './message_cont';

class JobList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <JobCont />
      </Container>
    );
  }
}

export default JobList;
