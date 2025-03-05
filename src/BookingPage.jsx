import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookingPage() {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [bookingTime, setBookingTime] = useState('');
    const [duration, setDuration] = useState(1); // 預設時長為1小時

    useEffect(() => {
        const fetchRooms = async () => {
            const response = await axios.get('http://localhost:5000/api/rooms');
            setRooms(response.data);
        };
        fetchRooms();
    }, []);

    const handleBooking = async () => {
        if (selectedRoom && bookingTime) {
            await axios.post('http://localhost:5000/api/bookings', {
                roomId: selectedRoom,
                bookingTime,
                duration,
                userId: 'user123' // 假設用戶ID
            });
            alert('預約成功！');
        } else {
            alert('請選擇練習室和預約時間！');
        }
    };

    return (
        <div>
            <h1>預定練團</h1>
            <select onChange={(e) => setSelectedRoom(e.target.value)}>
                <option value="">選擇練習室</option>
                {rooms.map(room => (
                    <option key={room.id} value={room.id}>{room.name}</option>
                ))}
            </select>
            <input
                type="datetime-local"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
            />
            <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="1"
                placeholder="預約時長（小時）"
            />
            <button onClick={handleBooking}>預約</button>
        </div>
    );
}

export default BookingPage;