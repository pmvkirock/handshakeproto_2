import React from 'react';
import { Container, Button } from 'react-bootstrap';
import Applyjobs from './applyjobs';
import Applied from './applied';
import cookie from 'react-cookies';
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

  getInfo = () => {
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    console.log('Hello' + this.props.idjob);
    if (this.props.idjob == '') {
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios
        .get('http://localhost:8000/getAllJobs')
        .then(response => {
          if (response.status === 200) {
            this.setState({
              error: '',
              data: response.data
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
    } else {
      axios
        .get('http://localhost:8000/getJobs?idjob=' + this.props.idjob)
        .then(response => {
          if (response.status === 200) {
            this.setState({
              error: '',
              data: response.data
            });
            console.log(this.state.data);
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
    }
  };

  componentDidMount() {
    this.getInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.idjob !== prevProps.idjob) this.getInfo();
  }

  render() {
    var x;
    if (this.state.data[0] == undefined) return <div>Loading...</div>;
    if (this.props.getType == 'Company') {
      if (this.props.idcompany == cookie.load('cookie')) {
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
          onClick={this.handleShow}
        >
          Apply Now
        </Button>
      );
    }
    return (
      <Container className="padding-all">
        <h4>{this.state.data[0].job_title}</h4>
        <p className="margin-b-2">{this.state.data[0].company_name}</p>
        <p className="intern-type margin-b-2">{this.state.data[0].job_cat}</p>
        <p className="intern-type margin-b-2">
          {this.state.data[0].location}, CA
        </p>
        <p className="intern-type">{this.state.data[0].paid}</p>
        <div
          className="border-all padding-all"
          style={{ paddingTop: 10 + 'px' }}
        >
          <p className="margin-b-2">
            <span style={{ marginTop: 10 + 'px' }}>
              Application Closes on {this.state.data[0].deadline}
            </span>{' '}
            {x}
          </p>
        </div>
        <p style={{ marginTop: 10 + 'px' }}>{this.state.data[0].job_des}</p>
        <Applyjobs
          show={this.state.setShow}
          handleClose={this.handleClose}
          idcompany={this.state.data[0].idcompany}
          idjob={this.props.idjob}
        />
        <Applied
          show={this.state.setShowApplied}
          handleClose={this.handleCloseApplied}
          idcompany={this.state.data[0].idcompany}
          idjob={this.props.idjob}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    getType: state.getType
  };
};

export default connect(mapStateToProps)(JobDes);
