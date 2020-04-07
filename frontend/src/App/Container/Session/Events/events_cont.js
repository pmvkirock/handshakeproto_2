/* eslint react/prop-types: 0 */

import React from 'react';
import { Container, Row, Col, Button, Pagination, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import NewJob from './edit_det';
import { getAllEvents } from '../../../../actions/getEvents';
import { sortFilter } from '../../../../actions';
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

  setSort = e => {
    this.props.dispatch(sortFilter(e.target.value));
  };

  pageSet = page => {
    var data = {};
    if (localStorage.getItem('type') == 'Company') {
      data = {
        page: page,
        title: this.props.getEventsFilter,
        city: this.props.getCityFilter,
        sort: this.props.getSortFilter,
        comp_id: localStorage.getItem('user_id')
      };
    } else {
      data = {
        page: page,
        title: this.props.getEventsFilter,
        city: this.props.getCityFilter,
        sort: this.props.getSortFilter
      };
    }
    this.props.dispatch(getAllEvents(data));
    this.setState({
      page: page
    });
  };

  getInfo = () => {
    var data = {};
    if (localStorage.getItem('type') == 'Company') {
      data = {
        page: 1,
        title: '',
        city: '',
        sort: '',
        comp_id: localStorage.getItem('user_id')
      };
    } else {
      data = {
        page: 1,
        title: '',
        city: '',
        sort: ''
      };
    }
    this.props.dispatch(getAllEvents(data));
  };

  componentDidMount() {
    this.getInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.getEventsFilter !== prevProps.getEventsFilter) {
      const data = {
        page: this.state.page,
        title: this.props.getEventsFilter,
        city: this.props.getCityFilter,
        sort: this.props.getSortFilter
      };
      if (localStorage.getItem('type') === 'Company') {
        Object.assign(data, {
          comp_id: localStorage.getItem('user_id')
        });
      }
      this.props.dispatch(getAllEvents(data));
      this.setState({ activeJob: '' });
    }
    if (this.props.getCityFilter !== prevProps.getCityFilter) {
      const data = {
        page: this.state.page,
        title: this.props.getEventsFilter,
        city: this.props.getCityFilter,
        sort: this.props.getSortFilter
      };
      if (localStorage.getItem('type') === 'Company') {
        Object.assign(data, {
          comp_id: localStorage.getItem('user_id')
        });
      }
      this.props.dispatch(getAllEvents(data));
      this.setState({ activeJob: '' });
    }
    if (this.props.getSortFilter !== prevProps.getSortFilter) {
      const data = {
        page: this.state.page,
        title: this.props.getEventsFilter,
        city: this.props.getCityFilter,
        sort: this.props.getSortFilter
      };
      if (localStorage.getItem('type') === 'Company') {
        Object.assign(data, {
          comp_id: localStorage.getItem('user_id')
        });
      }
      this.props.dispatch(getAllEvents(data));
      this.setState({ activeJob: '' });
    }
  }

  render() {
    var add = '';
    let items = [];
    for (let number = 1; number <= this.props.getAllEvents.pages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={
            number === this.props.getAllEvents.page ||
            (this.props.getAllEvents.page === null && number === 1)
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
    var printJobs = this.props.getAllEvents.events.map(
      ({
        _id,
        title,
        desc,
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
            indexkey={_id}
            onClick={() => this.handleJob(_id, idcompany)}
            className="jobCont"
            key={_id}
            href={'#'}
          >
            <Job
              data-key={_id}
              event_name={title}
              event_des={desc}
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
          <Container className="job-listing">
            <Row>
              <Col xl={6}>
                <p className="job-count intern-type">
                  {this.props.getAllEvents.limit * this.props.getAllEvents.page}{' '}
                  of {this.props.getAllEvents.total} Events
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
                  <option>Location - Asc</option>
                  <option>Location - Dsc</option>
                </Form.Control>
              </Col>
            </Row>
          </Container>
          {printJobs}
          <Pagination>{items}</Pagination>
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
    getType: state.getType,
    getAllEvents: state.getAllEvents,
    getSortFilter: state.getSortFilter
  };
};

export default connect(mapStateToProps)(JobCont);
