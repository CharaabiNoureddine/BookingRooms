import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { rooms: [], loading: true };

        this.addReservation = this.addReservation.bind(this);
    }

    componentDidMount() {
        this.roomsData();
    }

    addReservation(room) {
        this.props.match.params.room = room;
        this.props.history.push(`/BookingForm/${room}`);
        console.log('testtt');
    }


  render () {
      let contents = this.state.loading
          ? <p><em>Loading...</em></p>
            /*: Home.renderRoomsTable(this.state.rooms);*/
         : <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Salle</th>
                        <th>Reserver </th>
                    </tr>
                </thead>
                <tbody>
                  {this.state.rooms.map(room =>
                        <tr key={room}>
                            <td>{room}</td>
                          <td><button className="btn btn-primary" onClick={() => this.addReservation(room)}>Reserver</button></td>
                        </tr>
                    )}
                </tbody>
            </table>

      return (
          <div>
              <h1 id="tabelLabel" >Liste des salles</h1>
              <p>Merci de reserver votre salle.</p>
              {contents}
          </div>
      );
    }

    async roomsData() {
        const response = await fetch('api/reservation/getrooms');
        const data = await response.json();
        this.setState({ rooms: data, loading: false });
    }
}
