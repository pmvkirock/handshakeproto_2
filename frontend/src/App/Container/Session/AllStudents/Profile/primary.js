import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

class Primary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideForm: 'HideForm',
      hideProfileForm: 'HideForm',

      firstName: '',
      lastName: '',
      dob: '',
      city: '',
      state: '',
      country: '',
      phone_num: '',
      email: '',
      coll_name: '',
      degree: '',
      data: [],
      prof_pic: ''
    };
  }

  getInfo = () => {};

  componentDidMount() {
    //console.log(cookie.load('cookie'));
    this.getInfo();
  }

  render() {
    let picture = '';
    if (this.props.getOtherStudent.profile_pic == null) {
      picture = `/profile.png`;
    } else {
      picture =
        `http://localhost:8000/prof_pic/` +
        this.props.getOtherStudent.profile_pic.replace('Prof_Pic', 'file') +
        `.jpeg`;
    }
    return (
      <Container className="background padding-all prof-info">
        <img
          src={picture}
          alt="user pic"
          style={{ width: 100 + 'px', borderRadius: 50 + '%' }}
        />
        <h4>
          {this.props.getOtherStudent.fname +
            ' ' +
            this.props.getOtherStudent.lname}
        </h4>
        <p>{}</p>
        <p>{}</p>
        <p>
          {this.props.getOtherStudent.city +
            ', ' +
            this.props.getOtherStudent.state +
            ', ' +
            this.props.getOtherStudent.country}
        </p>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    getOtherStudent: state.getOtherStudent
  };
};

export default connect(mapStateToProps)(Primary);
