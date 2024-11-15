import React from 'react';

export const PostDetails = () => {
  return (
    <div className="min-h-screen bg-purple-600 flex items-center justify-center">
      <div className="max-w-lg w-full p-4 bg-white border rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <img
            src="https://pbs.twimg.com/profile_images/1185404900060123137/zZRtZeD8_400x400.jpg"
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h4 className="text-lg font-semibold text-black">Roger García</h4>
            <p className="text-sm text-gray-500">@RogerAderly</p>
          </div>
        </div>
        <p className="mt-3 text-gray-900">
          <strong>#LOÚLTIMO</strong> FINAL DEL PARTIDO
          <br/>
          La selección argentina 🇦🇷 no pudo contra el seleccionado paraguayo y cayó 2 a 1. 
          <br/>
          <br/>
          Con este resultado Paraguay queda 6to en la tabla por el momento: 
          <br/>
          <ul className="mt-3 text-gray-700">
            <li>3. Brasil - 17</li>
            <li>4. Uruguay - 16</li>
            <li>5. Ecuador - 16</li>
            <li>6. PARAGUAY - 16</li>
            <li>7. Venezuela - 12</li>
            <li>8. Bolivia - 12</li>
            <li>9. PERÚ - 6</li>
            <li>10. Chile - 5</li>
          </ul>
        </p>
        <div className="flex items-center mt-4 space-x-6">
          <div className="flex items-center text-gray-600">
            <button className="text-blue-500 hover:text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M19 13H5V11H19V13Z" />
              </svg>
            </button>
            <span className="ml-1 text-sm">20</span> 
          </div>
          <div className="flex items-center text-gray-600">
            <button className="text-green-500 hover:text-green-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M12 2L10.59 3.41 16.17 9H3V11H16.17L10.59 16.59 12 18L20 12L12 2Z" />
              </svg>
            </button>
            <span className="ml-1 text-sm">5</span> 
          </div>
          <div className="flex items-center text-gray-600">
            <button className="text-red-500 hover:text-red-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M12 21C6.48 21 2 16.52 2 12S6.48 3 12 3s10 4.48 10 9-4.48 9-10 9zm0-16c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />
              </svg>
            </button>
            <span className="ml-1 text-sm">100</span> 
          </div>
          <div className="flex items-center text-gray-600">
            <button className="text-yellow-500 hover:text-yellow-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M20 3H4c-1.1 0-1.99.9-1.99 2L2 19c0 1.1.9 2 2 2h16c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2zm0 16H4V8h16v11z" />
              </svg>
            </button>
            <span className="ml-1 text-sm">15</span>
          </div>
        </div>
        <div className="mt-4">
          <textarea
            placeholder="Escribe tu respuesta..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white text-black"
          ></textarea>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Responder
          </button>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-black">Comentarios</h4>
          <div className="mt-2 space-y-4">
            <div className="p-2 border rounded-md text-black">
              <p>
                <strong>@juancito99:</strong> Qué mal partido de Argentina 😢.
              </p>
            </div>
            <div className="p-2 border rounded-md text-black">
              <p>
                <strong>@pedrito65:</strong> Vamos Paraguay 💪.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};