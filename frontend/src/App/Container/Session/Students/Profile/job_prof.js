import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { loadProfileData } from '../../../../../actions';

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
      tcompany_name: '',
      ttitle: '',
      tlocation: '',
      tfromMth: '',
      ttoMth: '',
      tfromYr: '',
      ttoYr: '',
      tidstudent_exp: '',
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
    this.setState({ tcompany_name: e.target.value });
  };

  titleChange = e => {
    this.setState({ ttitle: e.target.value });
  };

  locationChange = e => {
    this.setState({ tlocation: e.target.value });
  };

  descChange = e => {
    this.setState({ tdesc: e.target.value });
  };

  fromMthChange = e => {
    this.setState({ tfromMth: e.target.value });
  };

  toMthChange = e => {
    this.setState({ ttoMth: e.target.value });
  };

  fromYrChange = e => {
    this.setState({ tfromYr: e.target.value });
  };

  toYrChange = e => {
    this.setState({ ttoYr: e.target.value });
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
      stud_id: localStorage.getItem('user_id')
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post('stud_profile/insertExpInfo', data)
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
      company_name: this.state.tcompany_name,
      title: this.state.ttitle,
      location: this.state.tlocation,
      desc: this.state.tdesc,
      fromMth: this.state.tfromMth,
      toMth: this.state.ttoMth,
      fromYr: this.state.tfromYr,
      toYr: this.state.ttoYr,
      exp_id: e.target.getAttribute('name'),
      user_id: localStorage.getItem('user_id')
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post('stud_profile/updateExpInfo', data)
      .then(response => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            error: '',
            authFlag: true
          });
          this.props.dispatch(loadProfileData(data));
        } else {
          this.setState({
            error:
              '<p style={{color: red}}>Please enter correct credentials</p>',
            authFlag: false
          });
          this.props.dispatch(loadProfileData(data));
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
    this.props.getProfileInfo.work_exp.map(
      ({
        name,
        title,
        location,
        work_des,
        fromMonth,
        fromYear,
        toMonth,
        toYear,
        _id
      }) => {
        this.setState(prevState => {
          return {
            editJobForm: prevState.editJobForm.concat('HideForm'),
            company_name: prevState.company_name.concat(name),
            title: prevState.title.concat(title),
            location: prevState.location.concat(location),
            desc: prevState.desc.concat(work_des),
            fromMth: prevState.fromMth.concat(fromMonth),
            toMth: prevState.toMth.concat(toMonth),
            fromYr: prevState.fromYr.concat(fromYear),
            toYr: prevState.toYr.concat(toYear),
            idstudent_exp: prevState.idstudent_exp.concat(_id)
          };
        });
      }
    );
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
        editSchoolForm: x,
        tcompany_name: this.state.company_name[e.target.value],
        ttitle: this.state.title[e.target.value],
        tlocation: this.state.location[e.target.value],
        tdesc: this.state.desc[e.target.value],
        tfromMth: this.state.fromMth[e.target.value],
        ttoMth: this.state.toMth[e.target.value],
        tfromYr: this.state.fromYr[e.target.value],
        ttoYr: this.state.toYr[e.target.value],
        tidstudent_exp: this.state.idstudent_exp[e.target.value]
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.getProfileInfo.work_exp !== prevProps.getProfileInfo.work_exp
    ) {
      this.getInfo();
    }
  }

  render() {
    var i = -1;
    console.log(this.props.getProfileInfo);
    if (this.props.getProfileInfo) {
      var renderDet = this.props.getProfileInfo.work_exp.map(
        ({
          _id,
          name,
          title,
          location,
          work_des,
          fromMonth,
          fromYear,
          toMonth,
          toYear
        }) => {
          i++;
          return (
            <div key={_id}>
              <div className="edu-details" style={{ paddingTop: 10 + 'px' }}>
                <h6>{name}</h6>
                <p>{title}</p>
                <p>{location}</p>
                <p>
                  {fromMonth}/{fromYear}-{toMonth}/{toYear}
                </p>
                <p>{work_des}</p>
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
                        value={this.state.tcompany_name}
                        onChange={this.companyChange}
                        name={i}
                      />
                    </Form.Group>
                    <Form.Group controlId="formTitle">
                      <Form.Label>Job Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Title"
                        value={this.state.ttitle}
                        onChange={this.titleChange}
                        name={i}
                      />
                    </Form.Group>
                    <Form.Group controlId="formLocation">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Location"
                        value={this.state.tlocation}
                        onChange={this.locationChange}
                        name={i}
                      />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        value={this.state.tdesc}
                        onChange={this.descChange}
                        name={i}
                      />
                    </Form.Group>
                    <Row className="top-10">
                      <Col>
                        <Form.Label>Start Month</Form.Label>
                        <Form.Control
                          placeholder="Month"
                          value={this.state.tfromMth}
                          onChange={this.fromMthChange}
                          name={i}
                        />
                      </Col>
                      <Col>
                        <Form.Label>Start Year</Form.Label>
                        <Form.Control
                          placeholder="Year"
                          value={this.state.tfromYr}
                          onChange={this.fromYrChange}
                          name={i}
                        />
                      </Col>
                      <Col>
                        <Form.Label>To Month</Form.Label>
                        <Form.Control
                          placeholder="Month"
                          value={this.state.ttoMth}
                          onChange={this.toMthChange}
                          name={i}
                        />
                      </Col>
                      <Col>
                        <Form.Label>Start Year</Form.Label>
                        <Form.Control
                          placeholder="Year"
                          value={this.state.ttoYr}
                          onChange={this.toYrChange}
                          name={i}
                        />
                      </Col>
                    </Row>
                    <Button
                      className="top-10"
                      value={i}
                      name={this.state.tidstudent_exp}
                      onClick={this.updatePers}
                    >
                      Add Experience
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          );
        }
      );
    }
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

const mapStateToProps = function(state) {
  return {
    getProfileInfo: state.getProfileInfo
  };
};

export default connect(mapStateToProps)(Education);
