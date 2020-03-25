import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import cookie from 'react-cookies';

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideForm: 'HideForm',
      editJobForm: [],
      error: '',
      data: [],
      company_name: [],
      title: [],
      location: [],
      fromMth: [],
      toMth: [],
      fromYr: [],
      toYr: [],
      idstudent_exp: [],
      desc: [],
      ncompany_name: '',
      ntitle: '',
      nlocation: '',
      nfromMth: '',
      ntoMth: '',
      nfromYr: '',
      ntoYr: '',
      nidstudent_exp: '',
      ndesc: '',
      i: null
    };
  }

  ncompanyChange = e => {
    this.setState({ ncompany_name: e.target.value });
  };

  ntitleChange = e => {
    this.setState({ ntitle: e.target.value });
  };

  nlocationChange = e => {
    this.setState({ nlocation: e.target.value });
  };

  ndescChange = e => {
    this.setState({ ndesc: e.target.value });
  };

  nfromMthChange = e => {
    this.setState({ nfromMth: e.target.value });
  };

  ntoMthChange = e => {
    this.setState({ ntoMth: e.target.value });
  };

  nfromYrChange = e => {
    this.setState({ nfromYr: e.target.value });
  };

  ntoYrChange = e => {
    this.setState({ ntoYr: e.target.value });
  };

  companyChange = e => {
    var x = this.state.company_name;
    x[e.target.getAttribute('name')] = e.target.value;
    this.setState({ company_name: x });
  };

  titleChange = e => {
    var x = this.state.title;
    x[e.target.getAttribute('name')] = e.target.value;
    this.setState({ title: x });
  };

  locationChange = e => {
    var x = this.state.location;
    x[e.target.getAttribute('name')] = e.target.value;
    this.setState({ location: x });
  };

  descChange = e => {
    var x = this.state.desc;
    x[e.target.getAttribute('name')] = e.target.value;
    this.setState({ desc: x });
  };

  fromMthChange = e => {
    var x = this.state.fromMth;
    x[e.target.getAttribute('name')] = e.target.value;
    this.setState({ fromMth: x });
  };

  toMthChange = e => {
    var x = this.state.toMth;
    x[e.target.getAttribute('name')] = e.target.value;
    this.setState({ toMth: x });
  };

  fromYrChange = e => {
    var x = this.state.fromYr;
    x[e.target.getAttribute('name')] = e.target.value;
    this.setState({ fromYr: x });
  };

  toYrChange = e => {
    var x = this.state.toYr;
    x[e.target.getAttribute('name')] = e.target.value;
    this.setState({ toYr: x });
  };

  insertExp = e => {
    e.preventDefault();
    const data = {
      company_name: this.state.ncompany_name,
      title: this.state.ntitle,
      location: this.state.nlocation,
      desc: this.state.ndesc,
      fromMth: this.state.nfromMth,
      toMth: this.state.ntoMth,
      fromYr: this.state.nfromYr,
      toYr: this.state.ntoYr,
      stud_id: cookie.load('cookie')
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post('http://localhost:8000/insertExpInfo', data)
      .then(response => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            error: '',
            authFlag: true
          });
          this.getInfo();
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

  updatePers = e => {
    e.preventDefault();
    const data = {
      company_name: this.state.company_name[e.target.value],
      title: this.state.title[e.target.value],
      location: this.state.location[e.target.value],
      desc: this.state.desc[e.target.value],
      fromMth: this.state.fromMth[e.target.value],
      toMth: this.state.toMth[e.target.value],
      fromYr: this.state.fromYr[e.target.value],
      toYr: this.state.toYr[e.target.value],
      id: e.target.getAttribute('name')
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post('http://localhost:8000/updateExpInfo', data)
      .then(response => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            error: '',
            authFlag: true
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

  addSchool = () => {
    if (this.state.hideForm == 'ShowForm') {
      this.setState({
        hideForm: 'HideForm'
      });
    } else {
      this.setState({
        hideForm: 'ShowForm'
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
      .post('http://localhost:8000/stud_exp', data)
      .then(response => {
        console.log('EDU Status Code : ' + response.status);
        console.log(response.data);
        if (response.status === 200) {
          this.setState({
            data: response.data
          });
          response.data.map(
            ({
              company_name,
              title,
              location,
              fromMth,
              toMth,
              fromYr,
              toYr,
              idstudent_exp,
              jobDesc
            }) => {
              this.setState(prevState => {
                return {
                  editJobForm: prevState.editJobForm.concat('HideForm'),
                  company_name: prevState.company_name.concat(company_name),
                  title: prevState.title.concat(title),
                  location: prevState.location.concat(location),
                  fromMth: prevState.fromMth.concat(fromMth),
                  toMth: prevState.toMth.concat(toMth),
                  fromYr: prevState.fromYr.concat(fromYr),
                  toYr: prevState.toYr.concat(toYr),
                  idstudent_exp: prevState.idstudent_exp.concat(idstudent_exp),
                  desc: prevState.desc.concat(jobDesc)
                };
              });
            }
          );
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

  editFormJob = e => {
    if (this.state.editJobForm[e.target.value] == 'ShowForm') {
      var x = this.state.editJobForm;
      x[e.target.value] = 'HideForm';
      this.setState({
        i: e.target.value,
        editJobForm: x
      });
    } else {
      x = this.state.editJobForm;
      x[e.target.value] = 'ShowForm';
      this.setState({
        i: e.target.value,
        editJobForm: x
      });
    }
  };

  componentDidMount() {
    this.getInfo();
  }

  render() {
    var i = -1;
    var renderDet = this.state.data.map(() => {
      i++;
      return (
        <div key={this.state.idstudent_exp[i]}>
          <div className="edu-details" style={{ paddingTop: 10 + 'px' }}>
            <h6>{this.state.company_name[i]}</h6>
            <p>{this.state.title[i]}</p>
            <p>{this.state.location[i]}</p>
            <p>
              {this.state.fromMth[i]}/{this.state.fromYr[i]}-
              {this.state.toMth[i]}/{this.state.toYr[i]}
            </p>
            <p>{this.state.desc[i]}</p>
            <div className="button">
              <Button id={i + 'edit'} onClick={this.editFormJob} value={i}>
                Edit school
              </Button>
            </div>
            <div className={this.state.editJobForm[i] + ' edu-form'}>
              <Form>
                <Form.Group controlId="formCompName">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Company Name"
                    value={this.state.company_name[i]}
                    onChange={this.companyChange}
                    name={i}
                  />
                </Form.Group>
                <Form.Group controlId="formTitle">
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    value={this.state.title[i]}
                    onChange={this.titleChange}
                    name={i}
                  />
                </Form.Group>
                <Form.Group controlId="formLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Location"
                    value={this.state.location[i]}
                    onChange={this.locationChange}
                    name={i}
                  />
                </Form.Group>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    value={this.state.desc[i]}
                    onChange={this.descChange}
                    name={i}
                  />
                </Form.Group>
                <Row className="top-10">
                  <Col>
                    <Form.Label>Start Month</Form.Label>
                    <Form.Control
                      placeholder="Month"
                      value={this.state.fromMth[i]}
                      onChange={this.fromMthChange}
                      name={i}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Start Year</Form.Label>
                    <Form.Control
                      placeholder="Year"
                      value={this.state.fromYr[i]}
                      onChange={this.fromYrChange}
                      name={i}
                    />
                  </Col>
                  <Col>
                    <Form.Label>To Month</Form.Label>
                    <Form.Control
                      placeholder="Month"
                      value={this.state.toMth[i]}
                      onChange={this.toMthChange}
                      name={i}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Start Year</Form.Label>
                    <Form.Control
                      placeholder="Year"
                      value={this.state.toYr[i]}
                      onChange={this.toYrChange}
                      name={i}
                    />
                  </Col>
                </Row>
                <Button
                  className="top-10"
                  value={i}
                  name={this.state.idstudent_exp[i]}
                  onClick={this.updatePers}
                >
                  Add Experience
                </Button>
              </Form>
            </div>
          </div>
        </div>
      );
    });

    return (
      <Container className="background top-10 padding-all education">
        <div className="edu-details">
          <h5>Job Details</h5>
          {renderDet}
        </div>
        <div className="school-button">
          <Button onClick={this.addSchool}>Add New Experience</Button>
        </div>
        <div className={this.state.hideForm + ' edu-form'}>
          <h6 style={{ paddingTop: 10 + 'px' }}>Add New Experience</h6>
          <Form>
            <Form.Group controlId="formCompName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Company Name"
                value={this.state.ncompany_name}
                onChange={this.ncompanyChange}
              />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={this.state.ntitle}
                onChange={this.ntitleChange}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                value={this.state.nlocation}
                onChange={this.nlocationChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={this.state.ndesc}
                onChange={this.ndescChange}
              />
            </Form.Group>
            <Row className="top-10">
              <Col>
                <Form.Label>Start Month</Form.Label>
                <Form.Control
                  placeholder="Month"
                  value={this.state.nfromMth}
                  onChange={this.nfromMthChange}
                />
              </Col>
              <Col>
                <Form.Label>Start Year</Form.Label>
                <Form.Control
                  placeholder="Year"
                  value={this.state.nfromYr}
                  onChange={this.nfromYrChange}
                />
              </Col>
              <Col>
                <Form.Label>To Month</Form.Label>
                <Form.Control
                  placeholder="Month"
                  value={this.state.ntoMth}
                  onChange={this.ntoMthChange}
                />
              </Col>
              <Col>
                <Form.Label>Start Year</Form.Label>
                <Form.Control
                  placeholder="Year"
                  value={this.state.ntoYr}
                  onChange={this.ntoYrChange}
                />
              </Col>
            </Row>
            <Button
              className="top-10"
              value={i}
              name={this.state.idstudent_exp[0]}
              onClick={this.insertExp}
            >
              Add Experience
            </Button>
          </Form>
        </div>
      </Container>
    );
  }
}

export default Education;
