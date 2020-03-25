import React from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

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

  getInfo = () => {
    const data = {
      stud_id: this.props.id
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
            prof_pic: response.data[0].prof_pic
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
    let picture = '';
    if (this.state.prof_pic == null) {
      picture = `/profile.png`;
    } else {
      picture =
        `http://localhost:8000/prof_pic/` +
        this.state.prof_pic.replace('Prof_Pic', 'file') +
        `.jpeg`;
    }
    return (
      <Container className="background padding-all prof-info">
        <img
          src={picture}
          alt="user pic"
          style={{ width: 100 + 'px', borderRadius: 50 + '%' }}
        />
        <h4>{this.state.firstName + ' ' + this.state.lastName}</h4>
        <p>{this.state.coll_name}</p>
        <p>{this.state.degree}</p>
        <p>
          {this.state.city +
            ', ' +
            this.state.state +
            ', ' +
            this.state.country}
        </p>
      </Container>
    );
  }
}

export default Primary;
