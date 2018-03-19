import React from 'react';
import TextField from 'material-ui/TextField/';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton/';
import SelectField from 'material-ui/SelectField/';
import MenuItem from 'material-ui/MenuItem/';
import UtilityFunctions from '../../constants/UtilityFunctions';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginTop: 20,
    marginBottom: 16,
  },
};

const CreateListingForm = ({ state, handleChange, handleCostRepeater, submitListing, handleCheckBox, handleCategory }) => {
  const { listing, errors, disableSubmitListing } = state;
  const requirements = UtilityFunctions.getRequirementList(listing.requirementsArray);
  const categories = UtilityFunctions.getCategories();
  return (
    <section id="create-listing">
      <div className="container">
        <h2>Create New Listing</h2>
        <p className="description">
          Please provide as much as possible description so that interested donors can get the
          complete picture of the need and can decide to help.
          </p>
        <form>

          <div className="form-group row">
            <div className="col-12 col-sm-4">
              <SelectField
                value={listing.category}
                onChange={handleCategory}
                floatingLabelText="Listing Category"
                fullWidth={true}
                floatingLabelFixed={true}
                hintText="Category"
                maxHeight={200}
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
                onChange={handleChange}
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
              onChange={handleChange}
              value={listing.description}
              errorText={errors.description}
            />
          </div>

          <div className="form-group">
            <TextField
              hintText="Separate the requirements with a comma(,) and they will appear in a list"
              fullWidth={true}
              name="requirements"
              type="text"
              floatingLabelText="Requirements List"
              floatingLabelFixed={true}
              onChange={handleChange}
              value={listing.requirements}
              errorText={errors.requirements}
            />
            <ul>
              {requirements}
            </ul>
          </div>

          <div className="form-group row">
            <div className="col-12 col-sm-8">
              <TextField
                hintText="Estimated cost to fulfill the need."
                fullWidth={true}
                name="estimatedCost"
                type="text"
                floatingLabelText="Estimated cost"
                floatingLabelFixed={true}
                onChange={handleChange}
                value={listing.estimatedCost}
                errorText={errors.estimatedCost}
              />
            </div>

            <div className="col-12 col-sm-4">
              <SelectField
                floatingLabelText="Repeater"
                fullWidth={true}
                defaultValue="One Time"
                maxHeight={200}
                value={listing.costRepeater}
                onChange={handleCostRepeater}
                errorText={errors.costRepeater}
              >
                <MenuItem value="One Time" primaryText="One Time" />
                <MenuItem value="Weekly" primaryText="Weekly" />
                <MenuItem value="Monthly" primaryText="Monthly" />
              </SelectField>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-12 col-sm-8">
              <TextField
                hintText="Please provide complete address of the needy person."
                fullWidth={true}
                name="address"
                floatingLabelText="Complete Address"
                floatingLabelFixed={true}
                onChange={handleChange}
                value={listing.address}
                errorText={errors.address}
              />
            </div>
            <div className="col-12 col-sm-4">
              <TextField
                hintText="City Name"
                fullWidth={true}
                name="city"
                floatingLabelText="City"
                floatingLabelFixed={true}
                onChange={handleChange}
                value={listing.city}
                errorText={errors.city}
              />
            </div>
          </div>

          <div className="form-group">
            <TextField
              hintText="Phone Number (if available)"
              fullWidth={true}
              name="phone"
              floatingLabelText="Phone Number"
              floatingLabelFixed={true}
              onChange={handleChange}
              value={listing.phone}
              errorText={errors.phone}
            />
          </div>

          <div className="form-group">
            <Checkbox
              checkedIcon={<Visibility />}
              uncheckedIcon={<VisibilityOff />}
              label={ listing.public ? "Display my information publicly." : "Display my information only to the interested people." }
              style={styles.checkbox}
              onCheck={handleCheckBox}
            />
          </div>
{/* city and category is missing yet. */}
          <div className="form-group">
            <RaisedButton
              label="Preview Listing"
              secondary={true}
              style={{ marginTop: 12, marginRight: 12 }}
              // onClick={previewListing}
              disabled={disableSubmitListing}
            />
            <RaisedButton
              label="Submit Listing"
              primary={true}
              style={{ marginTop: 12 }}
              onClick={submitListing}
              disabled={disableSubmitListing}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

CreateListingForm.propTypes = {
  state: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  submitListing: PropTypes.func.isRequired,
  handleCostRepeater: PropTypes.func,
  handleCheckBox: PropTypes.func,
  handleCategory: PropTypes.func
}

export default CreateListingForm;
