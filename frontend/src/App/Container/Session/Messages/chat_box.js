import React from 'react';
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { getAllMessages } from '../../../../actions/getMessages';

class JobDes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: '',
      setShow: false,
      setShowApplied: false,
      content: ''
    };
  }

  setContent = e => {
    this.setState({ content: e.target.value });
  };

  handleClose = () => this.setState({ setShow: false });
  handleShow = () => {
    this.setState({ setShow: true });
  };

  handleCloseApplied = () => this.setState({ setShowApplied: false });
  handleShowApplied = () => {
    this.setState({ setShowApplied: true });
  };

  sendMessage = () => {
    var data = {
      senderid: this.state.data.senderid,
      recieverid: this.state.data.recieverid,
      content: this.state.content
    };
    var datax = {
      user_id: localStorage.getItem('user_id')
    };
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post('messages/sendMessage', data)
      .then(response => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.props.dispatch(getAllMessages(datax));
        } else {
          alert('Error');
        }
      })
      .catch(e => {
        this.setState({
          error: 'Please enter correct credentials' + e
        });
      });
  };

  getInfo = () => {
    console.log('Hello' + this.props.idjob);
    if (this.props.idjob == '') {
      this.setState({
        error: '',
        data: this.props.getAllMessages.messages[0]
      });
    } else {
      for (let i = 0; i < this.props.getAllMessages.messages.length; i++) {
        if (this.props.getAllMessages.messages[i]._id == this.props.idjob)
          this.setState({
            error: '',
            data: this.props.getAllMessages.messages[i]
          });
      }
    }
  };

  componentDidMount() {
    this.setState({
      error: '',
      data: this.props.getAllMessages.messages[0]
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.idjob !== prevProps.idjob) this.getInfo();
    if (this.props.getAllMessages !== prevProps.getAllMessages) this.getInfo();
  }

  render() {
    if (this.state.data.message == undefined)
      return <div>Click on event to message to view chat</div>;
    //var deadline = [];
    //if (this.state.data.date) deadline = this.state.data.date.split('T'); senderid, recieverid, sendername, recievername
    console.log(this.state.data);
    var messages = this.state.data.message.map(
      ({ _id, content, timestamp }) => {
        return (
          <div key={_id}>
            <h4>{content}</h4>
            <p>{timestamp}</p>
          </div>
        );
      }
    );
    return (
      <Container className="padding-all" style={{ bottom: '0px' }}>
        {messages}
        <InputGroup className="align-bottom">
          <FormControl
            placeholder="Send a message"
            aria-label="Send a message"
            aria-describedby="basic-addon2"
            value={this.state.content}
            onChange={this.setContent}
          />
          <InputGroup.Append>
            <Button onClick={this.sendMessage} variant="outline-secondary">
              Send
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    getAllMessages: state.getAllMessages
  };
};

export default connect(mapStateToProps)(JobDes);
