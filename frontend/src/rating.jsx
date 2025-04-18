import { useState } from 'react';
import Ratings from './ratinfetch'
function App() {
  const [vote, setVote] = useState(null);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white p-8 space-y-10">
      <h1 className="text-4xl font-bold">Hot or not</h1>
this is {Ratings}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Left Image + Button */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src="https://via.placeholder.com/200"
            alt="Person 1"
            className="rounded-lg shadow-2xl w-48 h-48 object-cover"
          />
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded"
            onClick={() => setVote('left')}
          >
            Vote
          </button>
        </div>

        <span className="text-2xl font-bold">VS</span>

        {/* Right Image + Button */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src="https://via.placeholder.com/200"
            alt="Person 2"
            className="rounded-lg shadow-2xl w-48 h-48 object-cover"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded"
            onClick={() => setVote('right')}
          >
            Vote
          </button>
        </div>
      </div>

      {vote && <p className="text-lg mt-4">You voted for the {vote} image!</p>}
    </div>
  );
}

export default App;
