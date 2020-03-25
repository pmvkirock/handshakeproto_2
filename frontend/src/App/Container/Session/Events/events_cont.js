/* eslint react/prop-types: 0 */

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import NewJob from './edit_det';

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
      .get('http://localhost:8000/getAllEvents')
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
    var add = '';
    if (this.props.getType == 'Company') {
      add = (
        <Button
          style={{
            float: 'right',
            borderRadius: 100 + '%',
            right: 40,
            bottom: 30,
            position: 'fixed',
            width: 60 + 'px',
            height: 60 + 'px',
            fontSize: 20 + 'px'
          }}
          onClick={this.handleShow}
        >
          +
        </Button>
      );
    }
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
        switch (this.props.getJobFilterPartFull) {
          case 'MyJobs':
            if (idcompany == cookie.load('cookie')) showJob = 'ShowForm';
            else showJob = 'HideForm';
            break;
          case 'None':
            showJob = 'ShowForm';
            break;
          default:
            showJob = 'ShowForm';
            break;
        }
        let regexJob = new RegExp(this.props.getEventsFilter, 'gi');
        if (event_name.match(regexJob) == null) showJob = 'HideForm';
        let regexCity = new RegExp(this.props.getCityFilter, 'gi');
        if (location.match(regexCity) == null) showJob = 'HideForm';
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
        <Col xl={4} style={{ overflowY: 'scroll', height: 70 + 'vh' }}>
          <Row>
            <Container className="job-listing">
              <h6>Job Listing</h6>
            </Container>
          </Row>
          {printJobs}
        </Col>
        <Col xl={8} style={{ overflowY: 'scroll', height: 70 + 'vh' }}>
          <JobDes
            idjob={this.state.activeJob}
            idcompany={this.state.activeComp}
          />
        </Col>
        {add}
        <NewJob
          show={this.state.setShow}
          handleClose={this.handleClose}
          getInfo={this.getInfo}
        />
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
