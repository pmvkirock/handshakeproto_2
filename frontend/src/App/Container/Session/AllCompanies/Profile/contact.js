import React from 'react';
import { Container, Row } from 'react-bootstrap';
import EditDet from './edit_det';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = { setShow: false };
  }

  handleClose = () => {
    this.props.getInfo();
    this.setState({ setShow: false });
  };
  handleShow = () => {
    this.setState({ setShow: true });
  };

  render() {
    return (
      <Container className="background">
        <Row className="padding-all" style={{ paddingBottom: 0 + 'px' }}>
          Email:
          <br /> {this.props.email}
        </Row>
        <Row className="padding-all" style={{ paddingBottom: 0 + 'px' }}>
          Website:
          <br /> {this.props.website}
        </Row>
        <EditDet
          show={this.state.setShow}
          handleClose={this.handleClose}
          data={this.props.data}
        />
      </Container>
    );
  }
}

export default Contact;
