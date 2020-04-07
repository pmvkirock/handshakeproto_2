import React from 'react';
import { Container, Button } from 'react-bootstrap';
import Applyjobs from './applyevents';
import Applied from './applied';
import { connect } from 'react-redux';

import axios from 'axios';

class JobDes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: '',
      setShow: false,
      setShowApplied: false
    };
  }

  handleClose = () => this.setState({ setShow: false });
  handleShow = () => {
    this.setState({ setShow: true });
  };

  handleCloseApplied = () => this.setState({ setShowApplied: false });
  handleShowApplied = () => {
    this.setState({ setShowApplied: true });
  };

  applyJob = e => {
    e.preventDefault();
    const data = {
      idstudent: localStorage.getItem('user_id'),
      idjob: this.props.idjob,
      idcompany: this.props.idcompany
    };
    if (
      this.props.getProfileInfo.school_info[0].major ==
      this.state.data.eligibility
    ) {
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios
        .post('http://localhost:8000/events/insertAppliEvents', data)
        .then(response => {
          console.log('Status Code : ', response.status);
          if (response.status === 200) {
            this.setState({
              error: '',
              authFlag: true
            });
            this.handleClose();
            alert('Applied successfully to this event');
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
    } else {
      alert('You are not eligible for this major');
    }
  };

  getInfo = () => {
    if (this.props.idjob == '') {
      this.setState({
        error: '',
        data: this.props.getAllEvents.events[0]
      });
    } else {
      for (let i = 0; i < this.props.getAllEvents.events.length; i++) {
        if (this.props.getAllEvents.events[i]._id == this.props.idjob)
          this.setState({
            error: '',
            data: this.props.getAllEvents.events[i]
          });
      }
    }
  };

  componentDidMount() {
    this.setState({
      error: '',
      data: this.props.getAllEvents.events[0]
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.idjob !== prevProps.idjob) this.getInfo();
    if (this.props.getAllEvents !== prevProps.getAllEvents) this.getInfo();
  }

  render() {
    var x;
    console.log(this.state.data);
    if (this.state.data == undefined) return <div>Loading...</div>;
    if (this.props.getType == 'Company') {
      if (this.state.data.idcompany == localStorage.getItem('user_id')) {
        x = (
          <Button
            style={{ float: 'right', padding: 5 + 'px' }}
            onClick={this.handleShowApplied}
          >
            Applied Candidates
          </Button>
        );
      } else {
        x = '';
      }
    } else {
      x = (
        <Button
          style={{ float: 'right', padding: 5 + 'px' }}
          onClick={this.applyJob}
        >
          RSVP Event
        </Button>
      );
    }
    var date = [];
    if (this.state.data.date) date = this.state.data.date.split('T');
    return (
      <Container className="padding-all">
        <h4>{this.state.data.title}</h4>
        <p className="margin-b-2">{this.state.data.company_name}</p>
        <p className="intern-type margin-b-2">
          Eligibility - {this.state.data.eligibility}
        </p>
        <p className="intern-type margin-b-2">{this.state.data.location}, CA</p>
        <p className="intern-type">
          {date[0]} - {this.state.data.time}
        </p>
        <div
          className="border-all padding-all"
          style={{ paddingTop: 10 + 'px' }}
        >
          <p className="margin-b-2">
            <span style={{ marginTop: 10 + 'px' }}>
              Application Closes on {this.state.data.date}
            </span>{' '}
            {x}
          </p>
        </div>
        <p style={{ marginTop: 10 + 'px' }}>{this.state.data.desc}</p>
        <Applyjobs
          show={this.state.setShow}
          handleClose={this.handleClose}
          idcompany={this.state.data.idcompany}
          idjob={this.props.idjob}
        />
        <Applied
          show={this.state.setShowApplied}
          handleClose={this.handleCloseApplied}
          idcompany={this.state.data.idcompany}
          idjob={this.props.idjob}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    getType: state.getType,
    getMajor: state.getMajor,
    getAllEvents: state.getAllEvents,
    getProfileInfo: state.getProfileInfo
  };
};

export default connect(mapStateToProps)(JobDes);
