import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {
    return (
        <div className="w-4/5 flex justify-center items-center bg-orange-200 flex-col space-y-10 p-24 rounded-lg">
          <p className="text-3xl font-bold">{props.heading}</p>
          <div className="flex space-x-2 justify-center items-center bg-blue-500 text-white px-3 py-2 rounded-sm">
            <Link to="/upload">{props.button}</Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </div>
        </div>
    );
}

export default Card;
