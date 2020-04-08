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
        data: this.props.getMyEvents.events[0].idjob
      });
    } else {
      for (let i = 0; i < this.props.getMyEvents.events.length; i++) {
        if (this.props.getMyEvents.events[i].idjob._id == this.props.idjob)
          this.setState({
            error: '',
            data: this.props.getMyEvents.events[i].idjob
          });
      }
    }
  };

  componentDidMount() {
    this.setState({
      error: '',
      data: this.props.getMyEvents.events[0].idjob
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.idjob !== prevProps.idjob) this.getInfo();
    if (this.props.getMyEvents !== prevProps.getMyEvents) this.getInfo();
  }

  render() {
    if (this.state.data == undefined)
      return <div>Click on event to view description</div>;
    var deadline = [];
    if (this.state.data.date) deadline = this.state.data.date.split('T');
    return (
      <Container className="padding-all">
        <h4>{this.state.data.title}</h4>
        <p className="margin-b-2">{this.state.data.company_name}</p>
        <p className="intern-type margin-b-2">
          Eligibility - {this.state.data.eligibility}
        </p>
        <p className="intern-type margin-b-2">{this.state.data.location}, CA</p>
        <p className="intern-type">
          {deadline[0]} - {this.state.data.time}
        </p>
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
    getMajor: state.getMajor,
    getMyEvents: state.getMyEvents
  };
};

export default connect(mapStateToProps)(JobDes);
