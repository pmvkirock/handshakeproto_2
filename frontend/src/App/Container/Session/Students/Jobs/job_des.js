import React from 'react';
import { Container } from 'react-bootstrap';
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
        data: this.props.getMyJobs.jobs[0].idjob
      });
    } else {
      for (let i = 0; i < this.props.getMyJobs.jobs.length; i++) {
        if (this.props.getMyJobs.jobs[i]._id == this.props.idjob)
          this.setState({
            error: '',
            data: this.props.getMyJobs.jobs[i].idjob
          });
      }
    }
  };

  componentDidMount() {
    this.setState({
      error: '',
      data: this.props.getMyJobs.jobs[0].idjob
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.idjob !== prevProps.idjob) this.getInfo();
    if (this.props.getMyJobs !== prevProps.getMyJobs) this.getInfo();
  }

  render() {
    if (this.state.data == undefined)
      return (
        <div>
          Loading... <br />
          Select Job for Info
        </div>
      );
    var deadline = [];
    if (this.state.data.deadline)
      deadline = this.state.data.deadline.split('T');
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
          </p>
        </div>
        <p style={{ marginTop: 10 + 'px' }}>{this.state.data.desc}</p>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    getType: state.getType,
    getMyJobs: state.getMyJobs
  };
};

export default connect(mapStateToProps)(JobDes);
