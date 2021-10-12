import React, { Component } from 'react';

export class BookingForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            room: this.props.location.pathname.replace('/BookingForm/', ''),
            personne: '',
            startTime: '',
            endTime: '',
            date: '',
            inputValue: ''
        }
    }

    async submitReservation() {
        //const response = await fetch('api/reservation/MakeReservation');

        // POST request using fetch inside useEffect React hook

        var personne = document.getElementById('personne').value;
        var room = document.getElementById('room').value;
        var startTime = document.getElementById('startTime').value;
        var endTime = document.getElementById('endTime').value;
        var date = document.getElementById('date').value;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Personne: personne, Room: room, Room: room, StartTime: startTime, EndTime: endTime, Date: date  })
        };
        fetch('api/reservation/MakeReservation', requestOptions).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    if (json[0] === "OK") {
                        alert("Créartion avec succès !" + json);
                    } else {
                        alert("Conflit, merci de choisir un créneau dans les créneaux disponible !" + json);
                    }
                    console.log(json);
                });
            }
        });

    }

    render() {
        return (
            <div>


                <h1 id="tabelLabel"> Réservation pour la salle {this.state.room}</h1>

                <div style={{ 'width': '100%', 'height': '50px' }}>
                    <label style={{ 'float': 'left', 'width': '170px' }}>Personne *</label> <input style={{ 'float': 'left', 'marginBottom': '10px', 'width': '200px' }} id="personne" name="personne" className="form-control" />
                </div>

                <div style={{ 'width': '100%', 'height':'50px' }}>
                    <label style={{ 'float': 'left', 'width': '170px' }}>Salle *</label> <input name="room" style={{ 'float': 'left', 'marginBottom': '10px', 'width': '200px' }} readOnly  id="room" className="form-control" defaultValue={this.state.room} />
                </div>

                <div>
                    <label style={{ 'width': '170px' }}>Heure début *</label>
                    <select name="startTime" id="startTime" style={{ 'display': 'inline-block', 'marginBottom': '10px', 'width': '50px' }} >
                        {[...Array(24)].map((x, i) =>
                            <option key={i}>{i < 10 ? "0" + i : i}</option>
                        )} 
                    </select>
                </div>

                <div>
                    <label style={{ 'width': '170px' }}>Heure fin *</label>
                    <select name="endTime" id="endTime" style={{ 'display': 'inline-block', 'marginBottom': '10px', 'width': '50px' }} >
                        {[...Array(24)].map((x, i) =>
                            <option key={i}>{i < 10 ? "0" + i : i}</option>
                            )}
                    </select>
                </div>

                <div style={{ 'width': '100%', 'height': '50px' }}>
                    <label style={{ 'float': 'left', 'width': '170px' }}>Date (JJ/MM/AAAA) *</label>
                    <input placeholder="date" id="date" style={{ 'float': 'left','width': '200px' }} name="date" className="form-control" />
                </div>

                <button className="btn btn-primary" style={{ 'margin': '10px 270px' }} onClick={this.submitReservation} >Valider</button>

            </div>
        );
    }
}