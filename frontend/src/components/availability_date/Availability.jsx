import { useState } from "react";

const AvailabilityManager = ({ userData, isOwnProfile, onSave }) => {
  const [availability, setAvailability] = useState([]);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);

  // Add a single time slot
  const addTimeSlot = () => {
    if (timeSlot) {
      setTimeSlots([...timeSlots, timeSlot]);
      setTimeSlot("");
    }
  };

  // Add availability (date + time slots)
  const addAvailability = () => {
    if (date && timeSlots.length > 0) {
      setAvailability([
        ...availability,
        {
          date,
          timeSlots: timeSlots.map((time) => ({ startTime: time })),
        },
      ]);
      setDate("");
      setTimeSlots([]);
    }
  };

  const handleSave = () => {
    onSave({ availability });
  };

  return (
    isOwnProfile && (
      <div className="max-w-md mx-auto p-4 mt-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Manage Availability</h2>

        {/* Date Input */}
        <div className="mb-4">
          <label className="block mb-2">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        {/* Time Slot Input */}
        <div className="mb-4">
          <label className="block mb-2">Start Time:</label>
          <input
            type="time"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <button
            onClick={addTimeSlot}
            className="mt-2 py-2 px-4 bg-green-500 hover:bg-green-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          >
            Add Time Slot
          </button>
        </div>

        {/* Display Added Time Slots */}
        <div className="mb-4">
          <h4 className="text-medium font-bold mb-2">Time Slots:</h4>
          <ul>
            {timeSlots.map((time, index) => (
              <li key={index} className="text-sm text-gray-700 mb-2">
                {time}
              </li>
            ))}
          </ul>
        </div>

        {/* Add Availability */}
        <button
          onClick={addAvailability}
          className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        >
          Add Availability
        </button>

        {/* Save Changes */}
        <button
          onClick={handleSave}
          className="py-2 px-4 bg-orange-500 hover:bg-orange-700 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
        >
          Save Changes
        </button>

        {/* Display Availability */}
        <div className="mt-4">
          <h3 className="text-medium font-bold mb-4">Availability:</h3>
          {availability.map((entry, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <strong className="text-sm font-bold mb-2">Date:</strong> {entry.date}
              <ul>
                {entry.timeSlots.map((slot, i) => (
                  <li key={i} className="text-sm text-gray-700 mb-2">
                    {slot.startTime}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default AvailabilityManager;