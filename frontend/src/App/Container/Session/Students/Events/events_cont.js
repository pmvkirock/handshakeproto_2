/* eslint react/prop-types: 0 */

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import Job from './event';
import JobDes from './events_des';

import { getEventData } from '../../../../../actions/getStudentEvents';

class JobCont extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activeJob: '',
      activeComp: '',
      setShow: false,
      i: 0
    };
  }

  handleJob = (job_id, comp_id) => {
    this.setState({
      activeJob: job_id,
      activeComp: comp_id
    });
  };

  handleClose = () => this.setState({ setShow: false });
  handleShow = () => {
    this.setState({ setShow: true });
  };

  getInfo = () => {
    var data = {
      user_id: localStorage.getItem('user_id')
    };

    this.props.dispatch(getEventData(data));
  };

  componentDidMount() {
    this.getInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.getJobFilterPartFull !== prevProps.getJobFilterPartFull)
      this.setState({ activeJob: '' });
  }

  render() {
    var printJobs = this.props.getMyEvents.events.map(
      ({ idjob, idcompany }) => {
        let showJob;
        return (
          <a
            indexkey={idjob._id}
            onClick={() => this.handleJob(idjob._id, idcompany)}
            className="jobCont"
            key={idjob._id}
            href={'#'}
          >
            <Job
              data-key={idjob._id}
              event_name={idjob.title}
              event_des={idjob.desc}
              location={idjob.location}
              time={idjob.time}
              date={idjob.date}
              eligibility={idjob.eligibility}
              company_name={idjob.company_name}
              email={idjob.email}
              show={showJob}
            />
          </a>
        );
      }
    );
    return (
      <Row className="background top-10">
        <Col xl={4} style={{ overflowY: 'scroll', height: 90 + 'vh' }}>
          <Row>
            <Container className="job-listing">
              <h6>Job Listing</h6>
            </Container>
          </Row>
          {printJobs}
        </Col>
        <Col xl={8} style={{ overflowY: 'scroll', height: 90 + 'vh' }}>
          <JobDes
            idjob={this.state.activeJob}
            idcompany={this.state.activeComp}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    getJobFilterPartFull: state.getJobFilterPartFull,
    getCityFilter: state.getCityFilter,
    getMyEvents: state.getMyEvents,
    getType: state.getType,
    getSortFilter: state.getSortFilter
  };
};

export default connect(mapStateToProps)(JobCont);
