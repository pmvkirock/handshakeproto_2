import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import cookie from 'react-cookies';
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
      tfirstName: '',
      tlastName: '',
      tdob: '',
      tcity: '',
      tstate: '',
      tcountry: '',
      tphone_num: '',
      temail: '',
      tcoll_name: '',
      tdegree: '',
      prof_pic: ''
    };
  }

  updatePers = e => {
    e.preventDefault();
    const data = {
      firstName: this.state.tfirstName,
      lastName: this.state.tlastName,
      dob: this.state.tdob,
      city: this.state.tcity,
      state: this.state.tstate,
      country: this.state.tcountry,
      user_id: localStorage.getItem('user_id'),
      prof_pic: this.state.tprof_pic
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post('http://localhost:8000/updatePersonal', data)
      .then(response => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            error: '',
            authFlag: true
          });
          this.getInfo();
          this.editpersonalinfo();
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
  };

  firstNameChange = e => {
    this.setState({ tfirstName: e.target.value });
  };

  lastNameChange = e => {
    this.setState({ tlastName: e.target.value });
  };

  dobChange = e => {
    this.setState({ tdob: e.target.value });
  };

  cityChange = e => {
    this.setState({ tcity: e.target.value });
  };

  stateChange = e => {
    this.setState({ tstate: e.target.value });
  };

  countryChange = e => {
    this.setState({ tcountry: e.target.value });
  };

  handleFileUpload = event => {
    let data = new FormData();
    console.log(event.target.files[0]);
    data.append('file', event.target.files[0]);
    data.append('name', 'Prof_Pic');
    axios
      .post('http://localhost:8000/files', data)
      .then(response => {
        console.log(response);
        this.setState({
          tprof_pic: response.data
        });
      })
      .catch(error => console.log('error ' + error));
  };

  editpersonalinfo = () => {
    if (this.state.hideProfileForm == 'ShowForm') {
      this.setState({
        hideProfileForm: 'HideForm'
      });
    } else {
      this.setState({
        hideProfileForm: 'ShowForm'
      });
    }
  };

  getInfo = () => {
    const data = {
      stud_id: cookie.load('cookie')
    };
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post('http://localhost:8000/stud_profile', data)
      .then(response => {
        console.log('Status Code : ', response.status);
        console.log(response.data);
        if (response.status === 200) {
          this.setState({
            error: '',
            firstName: response.data[0].First_Name,
            lastName: response.data[0].Last_Name,
            dob: response.data[0].Dob,
            city: response.data[0].City,
            state: response.data[0].State,
            country: response.data[0].Country,
            phone_num: response.data[0].phone_num,
            email: response.data[0].email,
            prof_pic: response.data[0].prof_pic,
            tfirstName: response.data[0].First_Name,
            tlastName: response.data[0].Last_Name,
            tdob: response.data[0].Dob,
            tcity: response.data[0].City,
            tstate: response.data[0].State,
            tcountry: response.data[0].Country,
            tphone_num: response.data[0].phone_num,
            temail: response.data[0].email,
            tprof_pic: response.data[0].prof_pic
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
    axios
      .post('http://localhost:8000/stud_edu', data)
      .then(response => {
        console.log('PRI Status Code : ', response.status);
        console.log(response.data);
        var i = 0;
        if (response.status === 200) {
          while (i < response.data.length) {
            if (response.data[i].primary_edu == 'Yes') {
              break;
            }
            i++;
          }
          //console.log(response.data[i].degree);
          this.setState({
            error: '',
            coll_name: response.data[i].coll_name,
            degree: response.data[i].degree
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
  };

  componentDidMount() {
    //console.log(cookie.load('cookie'));
    this.getInfo();
  }

  render() {
    var prof_pic = '/profile.png';
    if (
      this.state.prof_pic != '' &&
      this.state.prof_pic != null &&
      this.state.prof_pic != undefined
    ) {
      prof_pic =
        `http://localhost:8000/prof_pic/` +
        this.state.prof_pic.replace('Prof_Pic', 'file') +
        `.jpeg`;
    }
    return (
      <Container className="background padding-all prof-info">
        <img
          src={prof_pic}
          alt="user pic"
          style={{ width: 100 + 'px', borderRadius: 50 + '%' }}
        />
        <h4>
          {this.props.getProfileInfo.fname +
            ' ' +
            this.props.getProfileInfo.lname}
        </h4>
        <p>{this.props.getProfileInfo.school_info[0].name}</p>
        <p>{this.props.getProfileInfo.school_info[0].degree}</p>
        <p>
          {this.props.getProfileInfo.city +
            ', ' +
            this.props.getProfileInfo.state +
            ', ' +
            this.props.getProfileInfo.country}
        </p>
        <Button onClick={this.editpersonalinfo}>Edit Personal Info</Button>
        <div className={this.state.hideProfileForm + ' personal-form top-10'}>
          <Form classname="top-10">
            <Form.Group controlId="formFName">
              <Form.Control
                type="text"
                value={this.state.tfirstName}
                placeholder="Enter First Name"
                onChange={this.firstNameChange}
              />
            </Form.Group>
            <Form.Group controlId="formLName">
              <Form.Control
                type="text"
                value={this.state.tlastName}
                placeholder="Enter Last Name"
                onChange={this.lastNameChange}
              />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Control
                type="text"
                value={this.state.tcity}
                placeholder="Enter City"
                onChange={this.cityChange}
              />
            </Form.Group>
            <Form.Group controlId="formState">
              <Form.Control
                type="text"
                value={this.state.tstate}
                placeholder="Enter State"
                onChange={this.stateChange}
              />
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Control
                type="text"
                value={this.state.tcountry}
                placeholder="Enter Country"
                onChange={this.countryChange}
              />
            </Form.Group>
            <Form.Group controlId="formDOB">
              <Form.Control
                type="text"
                value={this.state.tdob}
                placeholder="Date of Birth"
                onChange={this.dobChange}
              />
            </Form.Group>
            <Form.Group controlId="formFile">
              <Form.Control
                name="prof_pic"
                type="file"
                onChange={this.handleFileUpload}
              />
            </Form.Group>
            <Button variant="primary" onClick={this.updatePers}>
              Update
            </Button>
          </Form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    getProfileInfo: state.getProfileInfo
  };
};

export default connect(mapStateToProps)(Primary);
