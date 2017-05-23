import isObject from 'lodash/isObject';
import size from 'lodash/size';
import React, { Component, PropTypes } from 'react';
import { Button, Modal, Popover, OverlayTrigger } from 'react-bootstrap';
import cl from 'classnames';
import axios from 'axios';

import { UPLOAD_HOST } from '../config';

export default class EventbriteFinder extends Component {

  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string
  };

  state = {
    modalOpened: false,
    q: '',
    organizers: {},
    tickets: {},
    events: [],
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
    const { q } = this.state;

    axios.post(`${UPLOAD_HOST}/eventbrite/search`, { q })
      .then(({ data: { events } }) => this.setState({ events }))
      .catch(({ errorMessage }) => this.setState({ errorMessage }));
  }

  onSelect(event, ticket) {
    const { input } = this.props;

    this.toggleModal(() => input.onChange({
      event: {
        id: event.id,
        name: event.name,
        description: event.description,
        organizer_id: event.organizer_id,
        url: event.url
      },
      tickets: [
        ...(input.value.tickets || []),
        ticket
      ]
    }));
  }

  showOrganizer(organizerId) {
    const { organizers } = this.state;

    axios.get(`${UPLOAD_HOST}/eventbrite/organizers/${organizerId}`)
      .then(({ data }) => this.setState({
        organizers: {
          ...organizers,
          [organizerId]: data
        }
      }))
      .catch(({ errorMessage }) => this.setState({ errorMessage }));
  }

  showTickets(eventId) {
    const { tickets } = this.state;

    axios.get(`${UPLOAD_HOST}/eventbrite/events/${eventId}/tickets`)
      .then(({ data: { ticket_classes } }) => this.setState({
        tickets: {
          ...tickets,
          [eventId]: ticket_classes
        }
      }))
      .catch(({ errorMessage }) => this.setState({ errorMessage }));
  }

  render() {
    const { input, label, placeholder, meta: { touched, error, warning } } = this.props;
    const { q, events, organizers, tickets, showModal } = this.state;

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


        {isObject(input.value) ? (
          <table className="table table-bordered table-striped table-hover m-t">
            <tbody>
            <tr>
              <td>{input.value.event.name ? input.value.event.name.text : null}</td>
              <td>
                {input.value.event.description ? (
                    <OverlayTrigger
                      trigger={['hover', 'focus']}
                      placement="left"
                      overlay={(
                        <Popover id={`event-${event.id}-description`} title="Description">
                          {input.value.event.description.text}
                        </Popover>
                      )}
                    >
                      <div>{(input.value.event.description.text || '').slice(0, 100)}</div>
                    </OverlayTrigger>
                  ) : null}
              </td>
              <td>
                {organizers[input.value.event.organizer_id] ? organizers[input.value.event.organizer_id].name : (
                    <Button className="btn btn-default" onClick={() => this.showOrganizer(input.value.event.organizer_id)}>Show Organizer</Button>
                  )}
              </td>
              <td>
                <table className="table table-hover table-bordered table-striped">
                  <tbody>
                  {input.value.tickets.map(ticket => (
                    <tr key={ticket.id}>
                      <td>{ticket.name}</td>
                      <td>{ticket.cost ? ticket.cost.display : null}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </td>
              <td>
                {input.value.event.url ? <a className="btn btn-primary" target="_blank" href={input.value.event.url}>More Info</a> : null}
              </td>
            </tr>
            </tbody>
          </table>
          ) : null}

        <Modal bsSize="lg" show={showModal} onHide={() => this.toggleModal()}>
          <Modal.Header closeButton>
            <Modal.Title>{placeholder}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-10">
                <fieldset className="form-group">
                  <input
                    name="q"
                    className="form-control"
                    placeholder="Find an event..."
                    value={q}
                    onChange={({ target: { value } }) => this.changeValue('q', value)}
                    onKeyPress={({ key }) => {
                      if (key === 'Enter') {
                        this.search()
                      }
                    }}
                  />
                  <Button
                    bsSize="xs"
                    bsStyle="default"
                    onClick={() => this.setState({ q: '', events: [] })}
                  >
                    Clear
                  </Button>
                </fieldset>
              </div>
              <div className="col-md-2">
                <Button bsStyle="primary" disabled={q === ''} onClick={() => this.search()}>
                  Search
                </Button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {size(events) > 0 ? (
                    <table className="table table-striped table-bordered table-hover">
                      <tbody>
                      {events.map(event => (
                        <tr key={event.id}>
                          <td>{event.name ? event.name.text : null}</td>
                          <td>
                            {event.description ? (
                                <OverlayTrigger
                                  trigger={['hover', 'focus']}
                                  placement="left"
                                  overlay={(
                                    <Popover id={`event-${event.id}-description`} title="Description">
                                      {event.description.text}
                                    </Popover>
                                  )}
                                >
                                  <div>{(event.description.text || '').slice(0, 150)}</div>
                                </OverlayTrigger>
                              ) : null}
                          </td>
                          <td>
                            {organizers[event.organizer_id] ? organizers[event.organizer_id].name : (
                                <Button className="btn btn-default" onClick={() => this.showOrganizer(event.organizer_id)}>Show Organizer</Button>
                              )}
                          </td>
                          <td>
                            {tickets[event.id] ? (
                              <table className="table table-hover table-bordered table-striped">
                                <tbody>
                                {tickets[event.id].map(ticket => (
                                  <tr key={ticket.id}>
                                    <td>{ticket.name}</td>
                                    <td>{ticket.cost ? ticket.cost.display : null}</td>
                                    <td>
                                      <Button bsStyle="success" onClick={() => this.onSelect(event, ticket)}>Select</Button>
                                    </td>
                                  </tr>
                                ))}
                                </tbody>
                              </table>
                              ) : (
                                <Button className="btn btn-default" onClick={() => this.showTickets(event.id)}>Show Tickets</Button>
                              )}
                          </td>
                          <td>
                            <a className="btn btn-primary" target="_blank" href={event.url}>More Info</a>
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
