import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import MainContent from './MainContent';

class App extends Component {

  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: [
      {
        name: 'Tresaure',
        isConfirmed: false,
        isEditing: false
      },
      {
        name: 'Nick',
        isConfirmed: false,
        isEditing: false
      },
      {
        name: 'Matt',
        isConfirmed: false,
        isEditing: false
      }
    ]
  }

  toggleGuestProperty = (property, indexToChange) => 
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            [property]: !guest[property]
          }
        }
        return guest;
      })
    })
  
  toggleConfirmation = index =>
    this.toggleGuestProperty("isConfirmed", index)
  
  removeGuest = index => 
    this.setState({
      guests: [
        ...this.state.guests.slice(0, index),
        ...this.state.guests.slice(index +1)
      ]
    })
  
  toggleEditing = index => 
    this.toggleGuestProperty("isEditing", index)
  
  setNameAt = (name, indexToChange) => 
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            name
          }
        }
        return guest;
      })
    })
  
  toggleFilter = () => 
    this.setState({ isFiltered: !this.state.isFiltered });
  
  handleNameInput = e => 
    this.setState({ pendingGuest: e.target.value })
  
  handleGuestSubmission = e => {
    e.preventDefault()
    if (this.state.pendingGuest.length > 0) {
      this.setState({
        guests: [
          {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false
          },
        ...this.state.guests
        ],
        pendingGuest: ""
      })
    }
  }

  getTotalInvited = () => this.state.guests.length;
  
  getAttendingGuests = () => 
    this.state.guests.reduce(
      (total, guest) => guest.isConfirmed ? total + 1 : total, 
      0
    )

  render() {
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;


    return (
      <div className="App">
        <Header
          pendingGuest={this.state.pendingGuest}
          handleGuestSubmission={this.handleGuestSubmission}
          handleNameInput={this.handleNameInput}
        />
        <MainContent
          toggleFilter={this.toggleFilter}
          isFiltered={this.state.isFiltered}
          totalInvited={totalInvited}
          numberAttending={numberAttending}
          numberUnconfirmed={numberUnconfirmed}
          guests={this.state.guests}
          toggleConfirmation={this.toggleConfirmation}
          toggleEditing={this.toggleEditing}
          setNameAt={this.setNameAt}
          removeGuest={this.removeGuest}
          pendingGuest={this.state.pendingGuest}
        />

        {/* <header>
          <h1>RSVP</h1>
          <p>An Invitee Register</p>
          <form onSubmit={this.handleGuestSubmission}>
            <input 
              type="text" 
              onChange={this.handleNameInput}
              value={this.state.pendingGuest}
              placeholder="Invite Someone" 
            />
            <button type="submit" name="submit" value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input 
                type="checkbox" 
                onChange={this.toggleFilter}
                checked={this.state.isFiltered}
              /> Hide those who haven't responded
            </label>
          </div>
          <Counter 
            totalInvited={totalInvited}
            numberAttending={numberAttending}
            numberUnconfirmed={numberUnconfirmed}
          />
          
          <GuestList 
            guests={this.state.guests}
            toggleConfirmation={this.toggleConfirmation}
            toggleEditing={this.toggleEditing}
            setNameAt={this.setNameAt}
            isFiltered={this.state.isFiltered}
            removeGuest={this.removeGuest}
            pendingGuest={this.state.pendingGuest}
          />
        </div> */}
      </div>
    );
  }
}

export default App;
