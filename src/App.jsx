import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import BookingForm from './components/BookingForm';

function App() {
  return (
    <div>
      <h1>Slot Booking App</h1>
      <BookingForm />
    </div>
  );
}

export default App;
