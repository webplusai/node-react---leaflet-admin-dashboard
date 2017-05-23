import find from 'lodash/find';
import filter from 'lodash/filter';
import size from 'lodash/size';
import omit from 'lodash/omit';
import isObject from 'lodash/isObject';
import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import cl from 'classnames';
import axios from 'axios';

import { YELP_HOST_URI } from '../config';

export default class YelpField extends Component {

  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string
  };

  state = {
    modalOpened: false,
    term: '',
    city: 'New York',
    state: 'NY',
    businesses: [],
    selectedBusinesses: this.props.input.value || [],
    selectedTime: {},
    errorMessage: null
  };

  componentWillReceiveProps(nextProps) {
    const { selectedTime } = this.state;
    const { input } = nextProps;

    (input.value || []).map(business => {
      if (business.time) {
        selectedTime[business.id] = business.time.iso;
      }
    });

    this.setState({
      selectedBusinesses: input.value || [],
      selectedTime: {
        ...selectedTime,
      }
    });
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  changeValue(name, value) {
    this.setState({
      [name]: value
    });
  }

  search() {
    const { term, city, state } = this.state;
    axios.post(YELP_HOST_URI, { term, location: [city, state].join(', ') })
      .then(({ data: { businesses } }) => this.setState({ businesses }))
      .catch(({ errorMessage }) => this.setState({ errorMessage }));
  }

  isSelected(business) {
    const { selectedBusinesses } = this.state;
    return find(selectedBusinesses, b => b.id === business.id);
  }

  addBusiness(business) {
    const { selectedBusinesses } = this.state;
    this.setState({
      selectedBusinesses: [...selectedBusinesses, business]
    });
  }

  removeBusiness(business) {
    const { selectedBusinesses, selectedTime } = this.state;
    this.setState({
      selectedBusinesses: filter(selectedBusinesses, b => b.id !== business.id),
      selectedTime: omit(selectedTime, business.id)
    });
  }

  addSelectedTime(business, value) {
    const { selectedTime } = this.state;
    this.setState({
      selectedTime: {
        ...selectedTime,
        [business.id]: value
      }
    });
  }

  selectLocation() {
    const { input } = this.props;
    const { selectedBusinesses, selectedTime } = this.state;
    input.onChange(selectedBusinesses.map(selectedBusiness => {
      if (selectedBusiness.location && !isObject(selectedBusiness.location.coordinate)) {
        return selectedBusiness;
      }

      const {
        id, name, image_url: preview, display_phone: phone,
        location: { address, neighborhoods, coordinate: { latitude, longitude } }
      } = selectedBusiness;

      return {
        preview,
        id,
        name,
        address,
        phone,
        neighborhood: (neighborhoods || []).join(', '),
        time: {
          iso: selectedTime[id],
          __type: 'Date'
        },
        location: {
          longitude,
          latitude,
          __type: 'GeoPoint'
        },
        latitude,
        longitude
      };
    }));
    this.toggleModal();
  }

  render() {
    const { input, label, placeholder, meta: { touched, error, warning } } = this.props;
    const { term, city, state, businesses, selectedBusinesses, selectedTime, showModal } = this.state;

    return (
      <fieldset className={cl('form-group', { 'has-error': (touched && error) })}>
        <label>{size(input.value || [])} location(s) have been added</label>
        <br />
        <a
          href="#"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            this.toggleModal();
          }}
        >
          {placeholder}
        </a>
        {touched && ((error && <div className="error help-block">{error}</div>) || (warning && <div className="error">{warning}</div>))}

        <Modal bsSize="lg" show={showModal} onHide={() => this.toggleModal()}>
          <Modal.Header closeButton>
            <Modal.Title>{placeholder}</Modal.Title>
            <Button bsSize="xs" bsStyle="primary" onClick={() => this.selectLocation()}>Apply</Button>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-5">
                <fieldset className="form-group">
                  <input
                    name="term"
                    className="form-control"
                    placeholder="Find a location..."
                    value={term}
                    onChange={({ target: { value } }) => this.changeValue('term', value)}
                    onKeyPress={({ key}) => {
                      if (key === 'Enter') {
                        this.search()
                      }
                    }}
                  />
                  <Button
                    bsSize="xs"
                    bsStyle="default"
                    onClick={() => this.setState({ term: '', businesses: [] })}
                  >
                    Clear
                  </Button>
                </fieldset>
              </div>
              <div className="col-md-3">
                <fieldset className="form-group">
                  <input
                    name="location"
                    className="form-control"
                    placeholder="City"
                    value={city}
                    onChange={({ target: { value } }) => this.changeValue('city', value)}
                  />
                </fieldset>
              </div>
              <div className="col-md-2">
                <fieldset className="form-group">
                  <input
                    name="location"
                    className="form-control"
                    placeholder="State"
                    value={state}
                    onChange={({ target: { value } }) => this.changeValue('state', value)}
                  />
                </fieldset>
              </div>
              <div className="col-md-2">
                <Button bsStyle="primary" disabled={(term === '') || (city === '')} onClick={() => this.search()}>
                  Search
                </Button>
              </div>
            </div>
            {size(selectedBusinesses) > 0 ? (
                <div className="row">
                  <div className="col-md-12">
                    Selected: {selectedBusinesses.map(b => (
                      <span key={b.id}>
                        {b.name}
                        &nbsp;
                        <a href="#" onClick={e => {
                          e.preventDefault();
                          this.removeBusiness(b);
                        }}>X</a>
                        &nbsp;
                      </span>
                  ))}
                  </div>
                </div>
              ) : null}
            <div className="row">
              <div className="col-md-12">
                {size(businesses) > 0 ? (
                    <table className="table table-striped table-bordered table-hover">
                      <tbody>
                      {businesses.map(business => (
                        <tr key={business.id}>
                          <td>
                            {business.image_url ? <img className="img-responsive" src={business.image_url} alt="" /> : null}
                          </td>
                          <td>{business.name}</td>
                          <td>{business.rating}</td>
                          <td>{((business.location ? business.location.address : []) || []).join(', ')}</td>
                          <td>
                            <DateTimePicker
                              calendar={false}
                              defaultValue={selectedTime[business.id] ? moment(selectedTime[business.id]).toDate() : null}
                              onChange={value => this.addSelectedTime(business, value)}
                            />
                            {this.isSelected(business) ? (
                                <Button bsStyle="danger" onClick={() => this.removeBusiness(business)}>Remove</Button>
                              ) : (
                                <Button bsStyle="primary" onClick={() => this.addBusiness(business)}>Select</Button>
                              )}
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  ) : null}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.toggleModal()}>Close</Button>
            <Button bsStyle="primary" onClick={() => this.selectLocation()}>Apply</Button>
          </Modal.Footer>
        </Modal>
      </fieldset>
    );
  }
}
