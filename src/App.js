import {useState} from 'react'
import Auth from './components/Auth/Auth'
import routes from './routes'
import './components/Auth/Auth.css'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

const stripe = loadStripe('pk_test_51ITboKGYQXVvJTOKktB52oAUVbuF7NmgznknaRgBiLBZicHBI8uIK9N3lG0iUH53V2B8jpYWTnUA8IhhaebnXMHF00fkKhe5mV')

const App = () => {
  return (
    <Elements stripe={stripe}>
      <div className="App">
        {routes}
      </div>
    </Elements>
  );
}

export default App;
