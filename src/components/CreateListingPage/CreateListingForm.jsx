import React, { Component } from 'react';
import TextField from 'material-ui/TextField/';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton/';
import SelectField from 'material-ui/SelectField/';
import MenuItem from 'material-ui/MenuItem/';
import UtilityFunctions from '../../constants/UtilityFunctions';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import isNumeric from 'validator/lib/isNumeric';
import isEmpty from 'validator/lib/isEmpty';
import {Link} from 'react-router-dom';
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentAdd from 'material-ui/svg-icons/content/add';
import Tags from './../Common/Tags';
// import objectAssign from 'object-assign';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginTop: 20,
    marginBottom: 16,
  },
};

const sourceTags=[
  {label:"Food & Clothing"},
  {label:"Education Scholarship"},
  {label:"Medicines"},
];

const resetListing = () => {
  return {
    category: "",
    title: "",
    description: "",
    requirements: [],
    estimatedCost: "",
    costRepeater: "",
    name: "",
    address: "",
    city: "",
    phone: "",
    public: false,
    // requirementsArray: [],
    cnicNumber: "",
    requirementsError: "",
    img: []
  }
};

// const CreateListingForm = ({ state, handleChange, handleCostRepeater, submitListing, handleCheckBox, handleCategory, onRequirementChange }) => {
class CreateListingForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listing: props.listing,
      errors: resetListing(),
      disableSubmitButton: false,
      validateOnInput: false,
      filesListArray: [],
      defaultImgs: props.listing.img,
    };
    this.defTags;
    this.form;
    this.$this = this;
    // [{label:"Poland"},{label:"USA"}]
  }

  handleChange = (e, val) => {
    let listing = this.state.listing;
    listing[e.target.name] = val;
    // if(e.target.name.toLowerCase() == "requirements") {
    //   this.handleRequirements(this.state.listing.requirements);
    // }
    this.setState({ listing });

    // first set the state and then perform validation so that we can have exact fields to validate.
    if(this.state.validateOnInput) {
      this.validateListingForm();
    }
  }

  handleCostRepeater = (event, key, payload) => {
    let listing = this.state.listing;
    listing.costRepeater = payload;
    this.setState({listing});
    if(this.state.validateOnInput) {
      this.validateListingForm();
    }
  }
  handleCategory = (event, key, payload) => {
    let listing = this.state.listing;
    listing.category = payload;
    this.setState({listing});
    if(this.state.validateOnInput) {
      this.validateListingForm();
    }
  }
  /*
  handleRequirements = (requirements) => {
    let listing = this.state.listing;
    const requirementsArray = requirements.split(",");
    listing.requirementsArray = requirementsArray;
    this.setState({listing});
  }
  */
  handleCheckBox = (e, isInputChecked) => {
    let listing = this.state.listing;
    if(isInputChecked) {
      listing.public = true;
    } else {
      listing.public = false;
    }
    this.setState({listing});
  }

  onRequirementChange = (addedOrRemovedTag, allTags) => {
    let listing = this.state.listing;
    listing.requirements = allTags.map((tag) => tag.label);
    this.setState({listing});
    if(this.state.validateOnInput) {
      this.validateListingForm();
    }
  }
  handleFiles = (files) => {
    let listing = this.state.listing;
    let listingArray = [];
    for(let x = 0; x < files.length; x++) {
      listingArray.push(files[x]);
    }
    listing['img'] = listingArray;
    this.setState({listing});
    if(this.state.validateOnInput) {
      this.validateListingForm();
    }
  }

  submitListing = () => {
    this.setState({disableSubmitButton: true});
    if(!this.validateListingForm()) {
      this.setState({validateOnInput: true});
      return;
    }

    // getting form data into a variable
    let listing = this.state.listing;
    let fd = new FormData(this.form);
    fd.append('category', listing.category);
    fd.append('costRepeater', listing.costRepeater);
    fd.append('public', listing.public);
     //required to send data in an array format, it will be parsed again on server side by JSON.parse();
    fd.set('requirements', JSON.stringify(listing.requirements));
    for(let x = 0; x < listing.img.length; x++) {
      fd.append(`image${x}`, listing.img[x], listing.img[x].name );
    }
    /*
      if this is an update of the lisitng then it will have the listing._id in it.
      send this id to the server so that we can properly identify the listing for
      updating.
    */
    if(listing._id) {
      fd.append('_id', listing._id);
    }
    this.props.serverAction(fd);
  }

  validateListingForm = () => {
    let valid = true;
    let errors = resetListing(); // reset errors before validating
    let listing = this.state.listing;
    // listing.estimatedCost = '' + listing.estimatedCost; // convert cost into string.
    // category: "",
    if(listing.category.length < 1) {
      errors.category = "Please select the category.";
      valid = false;
    }
    // title: "",
    if(listing.title.length < 10 || listing.title.length > 75) {
      errors.title = "Title must be between 10 to 75 characters."
      valid = false;
    }
    // description: "",
    if(listing.description.length < 25) {
      errors.description = "Please provide detailed description";
      valid = false;
    }
    if(listing.description.length > 2500) {
      errors.description = "Description is too long, please reduce the description to maximum of 2500 characers";
      valid = false;
    }
    // requirementsArray: [],
    if(listing.requirements.length < 1) {
      errors.requirementsError = "Please provide at least one requirement";
      valid = false;
    }
    // estimatedCost: "",
    if(!isNumeric(''+listing.estimatedCost)) {
      errors.estimatedCost = "Please provide the amount in digits";
      valid = false;
    }
    // costRepeater: "",
    if(listing.costRepeater.length < 1) {
      errors.costRepeater = "Please select the duration repeater option";
      valid = false;
    }
    // name
    if(listing.name.length < 4) {
      errors.name = "Please provide full name";
      valid = false;
    }
    // address: "",
    if(isEmpty(listing.address)) {
      errors.address = "Address is required";
      valid = false;
    }
    if(listing.address.length < 10) {
      errors.address = "Address is too short, please provide the complete address clearly.";
      valid = false;
    }
    // city: "",
    if(isEmpty(listing.city)) {
      errors.city = "City is required";
      valid = false;
    }
    if(listing.city.length < 4) {
      errors.city = "Please provide the complete name of the city";
      valid = false;
    }
    // phone: "",
    if(!isEmpty(listing.phone) && !isNumeric(listing.phone)) {
      errors.phone = "Please provide the phone number in digits or leave it blank, if you dont have one";
      valid = false;
    }
    if(listing.phone.length < 11 || listing.phone.length > 15) {
      errors.phone = "Please provide a valid phone number.";
      valid = false;
    }
    // cnicNumber
    if(isEmpty(listing.cnicNumber)) {
      errors.cnicNumber = "CNIC number is required";
      valid = false;
    }else if(!isNumeric(listing.cnicNumber)) {
      errors.cnicNumber = "Only digits are allowed in cnic number.";
      valid = false;
    }else if(listing.cnicNumber.length != 13) {
      errors.cnicNumber = "Please provide valid cnic number without dashes";
      valid = false;
    }

    // Uploaded Files
    let files = this.state.listing.img;
    let filesListArray = [...files];
    if(filesListArray.length > 3) {
      errors.img = "Maximum 3 images are allowed";
      valid = false;
    } else if( !listing._id && filesListArray.length > 0 && filesListArray.length <= 3 ) {
      for(let x = 0; x < filesListArray.length; x++) {
        if(! /image\/.*/.test(filesListArray[x].type)) {
          errors.img = "Only images are allowed";
          valid = false;
          break;
        }
        // --------------------------
        const _URL = window.URL || window.webkitURL;
        let image, file;
        const $this = this;
        if ((file = filesListArray[x])) {
            image = new Image();
            image.onload = function() {
              if(this.width != 430 || this.height != 275){
                errors.img = "Invalid dimensions, please upload 430 x 275 pixels image";
                valid = false;
                $this.setState({errors});
              }
              // alert("The image width is " +this.width + " and image height is " + this.height);
            };
            image.src = _URL.createObjectURL(file);
        }
        // --------------------------
      }
    }
    this.setState({errors});
    if(valid) {
      this.setState({disableSubmitButton: false});
    }else{
      this.setState({disableSubmitButton: true});
    }
    return valid;
    // return true;
  };

  componentWillMount() {
    const {listing} = this.state;
    this.defTags = listing.requirements.map(requirement => ({label: requirement}));
  }

  render() {
    //  ({ state, handleChange, handleCostRepeater, submitListing, handleCheckBox, handleCategory, onRequirementChange }) => {
    const { listing, errors, disableSubmitButton } = this.state;
    // const requirements = UtilityFunctions.getRequirementList(listing.requirementsArray);
    const categories = UtilityFunctions.getCategories();
    let filesList;
    /*
    if(this.state.listing.img && this.state.listing.img.length > 0) {
      // creating new listing or modifying the files section in editing
      filesList = [...this.state.listing.img].map( (file, index) => {
        return(<li key={index}><i className="fa fa-file-image-o"></i> {file.name}</li>);
      });
    } else {
      // editing listing
      filesList = this.state.listing.img.map( (file, index) => {
        return(<li key={index}><i className="fa fa-file-image-o"></i> {file}</li>);
      });
    }
    */
    if(this.state.listing.img.length > 0) {
      filesList = this.state.listing.img.map( (file, index) => {
        return(<li key={index}><i className="fa fa-file-image-o"></i> {(file.name) ? file.name : file}</li>);
      });
    }else{
      filesList = this.state.defaultImgs.map( (file, index) => {
        return(<li key={index}><i className="fa fa-file-image-o"></i> {(file.name) ? file.name : file}</li>);
      });
    }

    return (
      <section id="create-listing">
        <div className="container">
          <h2>{this.props.pageTitle}</h2>
          <p className="description">
            Please provide as much as possible description so that interested donors can get the
            complete picture of the need and can decide to help.
            </p>
          <form ref={(form) => this.form = form }>
            <div className="form-group row">
              <div className="col-12 col-sm-4">
                <SelectField
                  value={listing.category}
                  onChange={this.handleCategory}
                  floatingLabelText="Listing Category"
                  fullWidth={true}
                  floatingLabelFixed={true}
                  hintText="Category"
                  maxHeight={200}
                  errorText={errors.category}
                >
                  {categories}
                </SelectField>
              </div>
              <div className="col-12 col-sm-8">
                <TextField
                  hintText="Title of the listing"
                  fullWidth={true}
                  name="title"
                  type="text"
                  floatingLabelText="Listing Title"
                  floatingLabelFixed={true}
                  onChange={this.handleChange}
                  value={listing.title}
                  errorText={errors.title}
                />
              </div>
            </div>

            <div className="form-group">
              <TextField
                hintText="Please describe your need briefly. this description will be visible to
                public so please describe the complete details with minimum possible wording."
                fullWidth={true}
                name="description"
                multiLine={true}
                floatingLabelText="Listing Description"
                floatingLabelFixed={true}
                rows={2}
                rowsMax={8}
                onChange={this.handleChange}
                value={listing.description}
                errorText={errors.description}
              />
            </div>

            <div className="form-group">
              <Tags
                textField={
                  {
                    hintText: 'Requirements List, Enter to add requirement', name: 'requirements', type: 'text',
                    floatingLabelText: 'Requirement List', floatingLabelFixed: true,
                    errorText: errors.requirementsError, fullWidth: true
                  }
                }
                button={null}
                // defTags={[{label: "test tag"}, {label: "another test tag"}]}
                defTags={this.defTags}
                // defTags={[]}
                sourceTags={sourceTags}
                style={{margin:0}}
                onRemove={this.onRequirementChange}
                onAdd={this.onRequirementChange}
              />
            </div>

            <div className="form-group row">
              <div className="col-12 col-sm-6 col-md-3">
                <TextField
                  hintText="Estimated cost to fulfill the need."
                  fullWidth={true}
                  name="estimatedCost"
                  type="text"
                  floatingLabelText="Estimated cost"
                  floatingLabelFixed={true}
                  onChange={this.handleChange}
                  value={listing.estimatedCost}
                  errorText={errors.estimatedCost}
                />
              </div>

              <div className="col-12 col-sm-6 col-md-3">
                <SelectField
                  floatingLabelText="Repeater"
                  fullWidth={true}
                  defaultValue="One Time"
                  maxHeight={200}
                  value={listing.costRepeater}
                  onChange={this.handleCostRepeater}
                  errorText={errors.costRepeater}
                >
                  <MenuItem value="One Time" primaryText="One Time" />
                  <MenuItem value="Weekly" primaryText="Weekly" />
                  <MenuItem value="Monthly" primaryText="Monthly" />
                </SelectField>
              </div>
            </div>

            <h4>Personal Information</h4>
            <div className="form-group row">
              <div className="col-12 col-sm-4">
                <TextField
                  hintText="Full Name"
                  fullWidth={true}
                  name="name"
                  floatingLabelText="Full Name"
                  floatingLabelFixed={true}
                  onChange={this.handleChange}
                  value={listing.name}
                  errorText={errors.name}
                />
              </div>
              <div className="col-12 col-sm-8">
                <TextField
                  hintText="Please provide complete address of the needy person."
                  fullWidth={true}
                  name="address"
                  floatingLabelText="Complete Address"
                  floatingLabelFixed={true}
                  onChange={this.handleChange}
                  value={listing.address}
                  errorText={errors.address}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-12 col-sm-4">
                <TextField
                  hintText="City Name"
                  fullWidth={true}
                  name="city"
                  floatingLabelText="City"
                  floatingLabelFixed={true}
                  onChange={this.handleChange}
                  value={listing.city}
                  errorText={errors.city}
                />
              </div>
              <div className="col-12 col-sm-4">
                <TextField
                  hintText="Phone Number (if available)"
                  fullWidth={true}
                  name="phone"
                  floatingLabelText="Phone Number"
                  floatingLabelFixed={true}
                  onChange={this.handleChange}
                  value={listing.phone}
                  errorText={errors.phone}
                />
              </div>
              <div className="col-12 col-sm-4">
                <TextField
                  hintText="CNIC Number"
                  fullWidth={true}
                  name="cnicNumber"
                  floatingLabelText="CNIC Number"
                  floatingLabelFixed={true}
                  onChange={this.handleChange}
                  value={listing.cnicNumber}
                  errorText={errors.cnicNumber}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-12 ">
                <RaisedButton
                  containerElement='label' // <-- Just add me!
                  label='Upload Images'>
                  <input type="file" multiple onChange={(e) => this.handleFiles(e.target.files) } style={{display: 'none'}}/>
                </RaisedButton>
                <span className="text-danger"> {this.state.errors.img}</span>
              </div>
              <div className="col-12">
                <div>
                  <ul className="uploaded-files-list">
                    {filesList}
                  </ul>
                </div>
              </div>
              {/* <input type="file" multiple /> */}
            </div>

            <div className="form-group">
              <Checkbox
                checkedIcon={<Visibility />}
                uncheckedIcon={<VisibilityOff />}
                // onCheck={() => this.handleCheckBox()}
                // onCheck is not triggering if checked property is passed, so controlled this
                // by using onClick event
                onClick={() => {listing.public = !listing.public; this.setState({listing})}}
                checked={listing.public}
                label={ listing.public ? "Display my personal information publicly." : "Display my personal information only to the interested people." }
                style={styles.checkbox}
              />
            </div>

            <div className="form-group">
              {/* <RaisedButton
                label="Preview Listing"
                secondary={true}
                style={{ marginTop: 12, marginRight: 12 }}
                // onClick={previewListing}
                disabled={disableSubmitButton}
              /> */}
              <RaisedButton
                label={this.props.buttonLabel}
                primary={true}
                style={{ marginTop: 12 }}
                onClick={this.submitListing}
                disabled={disableSubmitButton}
              />
              <Link to="/my-listings" className="btn btn-default" style={{marginLeft: 10}}>Back to my listings</Link>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

CreateListingForm.defaultProps = {
  listing: resetListing(),
  pageTitle: 'Create Listing',
  buttonLabel: 'Submit Listing'
};

CreateListingForm.propTypes = {
  listing: PropTypes.object,
  serverAction: PropTypes.func.isRequired,
  pageTitle: PropTypes.string,
  buttonLabel: PropTypes.string,
};

export default CreateListingForm;
