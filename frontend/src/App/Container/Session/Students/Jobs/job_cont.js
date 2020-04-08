/* eslint react/prop-types: 0 */

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getJobData } from '../../../../../actions/getStudentJobs';
import Job from './job';
import JobDes from './job_des';

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

    this.props.dispatch(getJobData(data));
  };

  componentDidMount() {
    this.getInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.getJobFilterPartFull !== prevProps.getJobFilterPartFull)
      this.setState({ activeJob: '' });
  }

  render() {
    var printJobs = this.props.getMyJobs.jobs.map(
      ({ status, idjob, idcompany }) => {
        let showJob;
        switch (this.props.getJobFilterPartFull) {
          case 'Pending':
            if (status == 'Pending') showJob = 'ShowForm';
            else showJob = 'HideForm';
            break;
          case 'Reviewed':
            if (status == 'Reviewed') showJob = 'ShowForm';
            else showJob = 'HideForm';
            break;
          case 'Declined':
            if (status == 'Declined') showJob = 'ShowForm';
            else showJob = 'HideForm';
            break;
          case 'None':
            showJob = 'ShowForm';
            break;
          default:
            showJob = 'ShowForm';
            break;
        }
        let regexJob = new RegExp(this.props.getJobFilter, 'gi');
        if (idjob.title.match(regexJob) == null) showJob = 'HideForm';
        let regexCity = new RegExp(this.props.getCityFilter, 'gi');
        if (idjob.location.match(regexCity) == null) showJob = 'HideForm';
        return (
          <a
            indexkey={idjob._id}
            onClick={() => this.handleJob(idjob._id, idcompany)}
            className="jobCont"
            key={idjob}
            href={'#'}
          >
            <Job
              data-key={idjob._id}
              job_title={idjob.title}
              deadline={idjob.deadline}
              location={idjob.location}
              salary={idjob.salary}
              job_des={idjob.desc}
              job_cat={idjob.job_cat}
              paid={idjob.paid}
              company_name={idjob.company_name}
              email={idjob.email}
              show={showJob}
              status={status}
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
      </Row>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    getJobFilterPartFull: state.getJobFilterPartFull,
    getJobFilter: state.getJobFilter,
    getCityFilter: state.getCityFilter,
    getType: state.getType,
    getMyJobs: state.getMyJobs
  };
};

export default connect(mapStateToProps)(JobCont);
