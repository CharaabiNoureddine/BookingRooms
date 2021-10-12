import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Reservation } from './components/Reservation';
import { BookingForm } from './components/BookingForm';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>

        <Route exact path='/' component={Home} />
        <Route path='/reservation' component={Reservation} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/BookingForm' component={BookingForm} />

      </Layout>
    );
  }
}
