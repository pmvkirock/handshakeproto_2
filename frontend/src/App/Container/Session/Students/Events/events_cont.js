/* eslint react/prop-types: 0 */

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import cookie from 'react-cookies';

import Job from './event';
import JobDes from './events_des';

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
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .get(
        `http://localhost:8000/getMyEvents?idstudent='` +
          cookie.load('cookie') +
          `'`
      )
      .then(response => {
        if (response.status === 200) {
          this.setState({
            error: '',
            data: response.data
          });
          console.log(this.state.data);
          this.setState({
            activeJob: this.state.data[0].idjob,
            activeComp: this.state.data[0].idcompany
          });
        } else {
          this.setState({
            error:
              '<p style={{color: red}}>Please enter correct credentials</p>',
            authFlag: false
          });
        }
      })
      .catch(e => {
        this.setState({
          error: 'Please enter correct credentials' + e
        });
      });
  };

  componentDidMount() {
    this.getInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.getJobFilterPartFull !== prevProps.getJobFilterPartFull)
      this.setState({ activeJob: '' });
  }

  render() {
    var printJobs = this.state.data.map(
      ({
        idevents,
        event_name,
        event_des,
        time,
        date,
        location,
        eligibility,
        company_name,
        email,
        idcompany
      }) => {
        let showJob;
        return (
          <a
            indexkey={idevents}
            onClick={() => this.handleJob(idevents, idcompany)}
            className="jobCont"
            key={idevents}
            href={'#'}
          >
            <Job
              data-key={idevents}
              event_name={event_name}
              event_des={event_des}
              location={location}
              time={time}
              date={date.split('T')[0]}
              eligibility={eligibility}
              company_name={company_name}
              email={email}
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
    getEventsFilter: state.getEventsFilter,
    getType: state.getType
  };
};

export default connect(mapStateToProps)(JobCont);
