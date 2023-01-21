import React, { useState } from 'react';
import moment from 'moment';
import './BookingForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingForm = () => {
  const [day, setDay] = useState('');
  const [duration, setDuration] = useState('');
  const [bookedSlots, setBookedSlots] = useState([
    { start: '2023-01-18', end: '2023-01-18' },
    { start: '2023-01-20', end: '2023-01-20' },
    { start: '2023-01-28', end: '2023-01-28' },
  ]);
  const [possibleSlots, setPossibleSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const notify = () => toast('Slot booked successfully!');

  const handleSubmit = (e) => {
    e.preventDefault();
    const start = moment(day).startOf('day');
    const end = moment(day).endOf('day');
    const interval = 15;
    const possibleSlots = [];
    while (start.isBefore(end)) {
      const slotStart = start.format();
      const slotEnd = start.add(duration, 'minutes').format();
      const isSlotAvailable = bookedSlots.every((bookedSlot) => {
        const bookedStart = moment(bookedSlot.start);
        const bookedEnd = moment(bookedSlot.end);
        return (
          (start.isSameOrBefore(bookedStart) &&
            end.isSameOrBefore(bookedStart)) ||
          (start.isSameOrAfter(bookedEnd) && end.isSameOrAfter(bookedEnd))
        );
      });
      if (isSlotAvailable) {
        possibleSlots.push({ start: slotStart, end: slotEnd });
      }
      start.add(interval, 'minutes');
    }
    setPossibleSlots(possibleSlots);
  };

  const handleSelect = (slot) => {
    setSelectedSlot(slot);
  };

  return (
    <form onSubmit={handleSubmit} className='booking-form'>
      <label>
        Day:
        <input
          className='form-title'
          type='date'
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </label>
      <br />
      <label>
        Duration:
        <input
          className='form-title'
          type='number'
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </label>
      <br />
      <button className='form-button' type='submit'>
        Find available slots
      </button>
      {possibleSlots.length > 0 && (
        <div>
          <h3 className='available-slots-title'>Available slots:</h3>
          <ul className='available-slots-list'>
            {possibleSlots.map((slot) => (
              <li className='available-slot' key={slot.start}>
                {moment(slot.start).format('MMMM Do YYYY, h:mm a')} -{' '}
                {moment(slot.end).format('MMMM Do YYYY, h:mm a')}{' '}
                <button
                  className={`book-button ${
                    slot?.start === selectedSlot?.start
                      ? 'book-button-disabled'
                      : ''
                  }`}
                  onClick={() => {
                    handleSelect(slot), notify();
                  }}
                >
                  Book
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </form>
  );
};

export default BookingForm;
