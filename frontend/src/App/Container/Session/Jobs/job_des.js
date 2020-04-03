import React from 'react';
import { Container, Button } from 'react-bootstrap';
import Applyjobs from './applyjobs';
import Applied from './applied';
import { connect } from 'react-redux';

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
    console.log('Hello' + this.props.idjob);
    if (this.props.idjob == '') {
      this.setState({
        error: '',
        data: this.props.getAllJobs.jobs[0]
      });
    } else {
      for (let i = 0; i < this.props.getAllJobs.jobs.length; i++) {
        if (this.props.getAllJobs.jobs[i]._id == this.props.idjob)
          this.setState({
            error: '',
            data: this.props.getAllJobs.jobs[i]
          });
      }
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.idjob !== prevProps.idjob) this.getInfo();
    if (this.props.getAllJobs !== prevProps.getAllJobs) this.getInfo();
  }

  componentDidMount() {
    this.setState({
      error: '',
      data: this.props.getAllJobs.jobs[0]
    });
  }

  render() {
    var x;
    console.log(this.state.data.deadline);
    if (this.state.data == undefined) return <div>Loading...</div>;
    if (this.props.getType == 'Company') {
      if (this.props.comp_id == localStorage.getItem('user_id')) {
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
    var deadline = [];
    if (this.state.data.deadline)
      deadline = this.state.data.deadline.split('T');
    console.log(deadline);
    return (
      <Container className="padding-all">
        <h4>{this.state.data.title}</h4>
        <p className="margin-b-2">{this.state.data.company_name}</p>
        <p className="intern-type margin-b-2">{this.state.data.job_cat}</p>
        <p className="intern-type margin-b-2">{this.state.data.location}, CA</p>
        <p className="intern-type">{this.state.data.paid}</p>
        <div
          className="border-all padding-all"
          style={{ paddingTop: 10 + 'px' }}
        >
          <p className="margin-b-2">
            <span style={{ marginTop: 10 + 'px' }}>
              Application Closes on {deadline[0]}
            </span>{' '}
            {x}
          </p>
        </div>
        <p style={{ marginTop: 10 + 'px' }}>{this.state.data.desc}</p>
        <Applyjobs
          show={this.state.setShow}
          handleClose={this.handleClose}
          idcompany={this.state.data.comp_id}
          idjob={this.props.idjob}
        />
        <Applied
          show={this.state.setShowApplied}
          handleClose={this.handleCloseApplied}
          idcompany={this.state.data.comp_id}
          idjob={this.props.idjob}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    getType: state.getType,
    getProfileInfo: state.getProfileInfo,
    getCompInfo: state.getCompInfo,
    getAllJobs: state.getAllJobs
  };
};

export default connect(mapStateToProps)(JobDes);
