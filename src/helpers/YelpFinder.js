import compact from 'lodash/compact';
import size from 'lodash/size';
import React, { Component, PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';
import cl from 'classnames';
import axios from 'axios';

import { YELP_HOST_URI } from '../config';

export default class YelpFinder extends Component {

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
    errorMessage: null
  };

  toggleModal(cb = null) {
    this.setState({ showModal: !this.state.showModal }, () => {
      if (cb) {
        cb();
      }
    });
  }

  changeValue(name, value) {
    this.setState({ [name]: value });
  }

  search() {
    const { term, city, state } = this.state;
    axios.post(YELP_HOST_URI, { term, location: [city, state].join(', ') })
      .then(({ data: { businesses } }) => this.setState({ businesses }))
      .catch(({ errorMessage }) => this.setState({ errorMessage }));
  }

  onSelect(business) {
    const { onSelect } = this.props;

    axios.post(`${YELP_HOST_URI}/show`, { id: business.id })
      .then(({ data }) => {
        this.toggleModal(() => onSelect({
          ...business,
          neighborhoods: data.neighborhoods || [],
          hours: data.hours && data.hours[0] ? data.hours[0].open : []
        }));
      })
      .catch(({ errorMessage }) => this.setState({ errorMessage }), () => this.toggleModal());
  }

  render() {
    const { input, label, placeholder, meta: { touched, error, warning } } = this.props;
    const { term, city, state, businesses, showModal } = this.state;

    return (
      <fieldset className={cl('form-group', { 'has-error': (touched && error) })}>
        <a
          href="#"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            this.toggleModal();
          }}
        >
          {label}
        </a>
        {touched && ((error && <div className="error help-block">{error}</div>) || (warning && <div className="error">{warning}</div>))}

        <Modal bsSize="lg" show={showModal} onHide={() => this.toggleModal()}>
          <Modal.Header closeButton>
            <Modal.Title>{placeholder}</Modal.Title>
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
            <div className="row">
              <div className="col-md-12">
                {size(businesses) > 0 ? (
                    <table className="table table-striped table-bordered table-hover">
                      <tbody>
                      {businesses.map(business => (
                        <tr key={business.id}>
                          <td>
                            {business.image_url ? <img className="yelp-image img-responsive" src={business.image_url} alt="" /> : null}
                          </td>
                          <td>{business.name}</td>
                          <td>{business.rating}</td>
                          <td>{business.location ? compact([business.location.address1, business.location.address2, business.location.address3]).join(', ') : null}</td>
                          <td>
                            <Button bsStyle="success" onClick={() => this.onSelect(business)}>Select</Button>
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
          </Modal.Footer>
        </Modal>
      </fieldset>
    );
  }
}
