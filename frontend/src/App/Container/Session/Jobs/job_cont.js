/* eslint react/prop-types: 0 */

import React from 'react';
import { Container, Row, Col, Button, Pagination, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import NewJob from './edit_det';
import Job from './job';
import JobDes from './job_des';
import { getJobData } from '../../../../actions/getJobs';
import { sortFilter } from '../../../../actions';

class JobCont extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activeJob: '',
      activeComp: '',
      setShow: false,
      i: 0,
      page: 1
    };
  }

  handleJob = (job_id, comp_id) => {
    console.log(this.state);
    this.setState({
      activeJob: job_id,
      activeComp: comp_id
    });
  };

  handleClose = () => this.setState({ setShow: false });
  handleShow = () => {
    this.setState({ setShow: true });
  };

  setSort = e => {
    this.props.dispatch(sortFilter(e.target.value));
  };

  pageSet = page => {
    const data = {
      page: page,
      filter: this.props.getJobFilterPartFull,
      title: this.props.getJobFilter,
      city: this.props.getCityFilter,
      sort: this.props.getSortFilter
    };
    this.props.dispatch(getJobData(data));
    this.setState({
      page: page
    });
  };

  getInfo = () => {
    var data = {};
    if (localStorage.getItem('type') == 'Company') {
      data = {
        page: 1,
        filter: this.props.getJobFilterPartFull,
        title: '',
        city: '',
        sort: '',
        comp_id: localStorage.getItem('user_id')
      };
    } else {
      data = {
        page: 1,
        filter: '',
        title: '',
        city: '',
        sort: ''
      };
    }
    this.props.dispatch(getJobData(data));
  };

  componentDidMount() {
    this.getInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.getJobFilterPartFull !== prevProps.getJobFilterPartFull) {
      const data = {
        page: this.state.page,
        filter: this.props.getJobFilterPartFull,
        title: this.props.getJobFilter,
        city: this.props.getCityFilter,
        sort: this.props.getSortFilter
      };
      if (localStorage.getItem('type') === 'Company') {
        Object.assign(data, {
          comp_id: localStorage.getItem('user_id')
        });
      }
      this.props.dispatch(getJobData(data));
      this.setState({ activeJob: '' });
    }
    if (this.props.getJobFilter !== prevProps.getJobFilter) {
      const data = {
        page: this.state.page,
        filter: this.props.getJobFilterPartFull,
        title: this.props.getJobFilter,
        city: this.props.getCityFilter,
        sort: this.props.getSortFilter
      };
      if (localStorage.getItem('type') === 'Company') {
        Object.assign(data, {
          comp_id: localStorage.getItem('user_id')
        });
      }
      this.props.dispatch(getJobData(data));
      this.setState({ activeJob: '' });
    }
    if (this.props.getCityFilter !== prevProps.getCityFilter) {
      const data = {
        page: this.state.page,
        filter: this.props.getJobFilterPartFull,
        title: this.props.getJobFilter,
        city: this.props.getCityFilter,
        sort: this.props.getSortFilter
      };
      if (localStorage.getItem('type') === 'Company') {
        Object.assign(data, {
          comp_id: localStorage.getItem('user_id')
        });
      }
      this.props.dispatch(getJobData(data));
      this.setState({ activeJob: '' });
    }
    if (this.props.getSortFilter !== prevProps.getSortFilter) {
      const data = {
        page: this.state.page,
        filter: this.props.getJobFilterPartFull,
        title: this.props.getJobFilter,
        city: this.props.getCityFilter,
        sort: this.props.getSortFilter
      };
      if (localStorage.getItem('type') === 'Company') {
        Object.assign(data, {
          comp_id: localStorage.getItem('user_id')
        });
      }
      this.props.dispatch(getJobData(data));
      this.setState({ activeJob: '' });
    }
  }

  render() {
    var add = '';
    let items = [];
    for (let number = 1; number <= this.props.getAllJobs.pages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={
            number === this.props.getAllJobs.page ||
            (this.props.getAllJobs.page === null && number === 1)
          }
          onClick={() => this.pageSet(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
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
    console.log(this.props.getAllJobs);
    var printJobs = this.props.getAllJobs.jobs.map(
      ({
        _id,
        title,
        deadline,
        location,
        salary,
        desc,
        job_cat,
        paid,
        company_name,
        email,
        comp_id
      }) => {
        let showJob;
        return (
          <a
            indexkey={_id}
            onClick={() => this.handleJob(_id, comp_id)}
            className="jobCont"
            key={_id}
            href={'#'}
          >
            <Job
              data-key={_id}
              job_title={title}
              deadline={deadline}
              location={location}
              salary={salary}
              job_des={desc}
              job_cat={job_cat}
              paid={paid}
              company_name={company_name}
              email={email}
              show={showJob}
            />
          </a>
        );
      }
    );
    return (
      <Row className="background top-10 box-shadow">
        <Col xl={4} style={{ overflowY: 'scroll', height: 70 + 'vh' }}>
          <Container className="job-listing">
            <Row>
              <Col xl={6}>
                <p className="job-count intern-type">
                  {this.props.getAllJobs.limit * this.props.getAllJobs.page} of{' '}
                  {this.props.getAllJobs.total} Jobs
                </p>
              </Col>
              <Col xl={6}>
                <Form.Control
                  as="select"
                  className="sort-dropdown"
                  onChange={this.setSort}
                >
                  <option>Posting Date - Asc</option>
                  <option>Posting Date - Dsc</option>
                  <option>Deadline - Asc</option>
                  <option>Deadline - Dsc</option>
                  <option>Location - Asc</option>
                  <option>Location - Dsc</option>
                </Form.Control>
              </Col>
            </Row>
          </Container>

          {printJobs}
          <Pagination>{items}</Pagination>
          <br />
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
    getJobFilter: state.getJobFilter,
    getCityFilter: state.getCityFilter,
    getSortFilter: state.getSortFilter,
    getType: state.getType,
    getAllJobs: state.getAllJobs
  };
};

export default connect(mapStateToProps)(JobCont);
