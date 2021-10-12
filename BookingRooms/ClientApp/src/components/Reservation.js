import React, { Component } from 'react';

export class Reservation extends Component {
    static displayName = Reservation.name;

    constructor(props) {
        super(props);

        this.state = { reservations: [], loading: true };
    }

    componentDidMount() {
        this.roomsData();
    }

    static renderRoomsTable(reservations) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Personne</th>
                        <th>Salle</th>
                        <th>Heure début</th>
                        <th>Heure fin </th>
                        <th>Date </th>
                        <th>Supprimer </th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(res =>
                        <tr key={res.id}>
                            <td>{res.personne}</td>
                            <td>{res.room}</td>
                            <td>{res.startTime}</td>
                            <td>{res.endTime}</td>
                            <td>{res.date}</td>
                            <td><button className="btn btn-primary">Supprimer</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    async supprimerReservation(id) {
        await fetch('api/Reservation/' + id, { method: 'DELETE' });
        window.location.reload();
        alert('Suppression OK ');
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Personne</th>
                        <th>Salle</th>
                        <th>Heure début</th>
                        <th>Heure fin </th>
                        <th>Date </th>
                        <th>Supprimer </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.reservations.map(res =>
                        <tr key={res.id}>
                            <td>{res.personne}</td>
                            <td>{res.room}</td>
                            <td>{res.startTime}</td>
                            <td>{res.endTime}</td>
                            <td>{res.date}</td>
                            <td><button className="btn btn-primary" onClick={() => this.supprimerReservation(res.id)}>Supprimer</button></td>
                        </tr>
                    )}
                </tbody>
            </table>

        return (
            <div>
                <h1 id="tabelLabel" >Liste des réservations</h1>
                <p></p>
                {contents}
            </div>
        );
    }

    async roomsData() {
        const response = await fetch('api/reservation/GetReservations');
        const data = await response.json();
        this.setState({ reservations: data, loading: false });
    }
}
