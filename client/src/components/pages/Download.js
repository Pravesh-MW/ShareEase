import { useState } from "react";

function Download() {
    const [url, setUrl] = useState(null);

    const handleInputChange = (e)=>{
        setUrl(e.target.value);
    }

    // const handleFormSubmit = (e)=>{
        

    // }
  return (
    <div className="flex w-full h-2/3 justify-center items-center pt-20">
      <div className="flex justify-center items-center bg-orange-200 flex-col space-y-10 p-24 rounded-lg">
        <label className="font-bold text-3xl">
          Paste Your Download Link
        </label>
        <input
          type="input"
          onChange={handleInputChange}
          className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=" paste your file url here"
        />
        <a  href = {url} download = {url?.substring(url.lastIndexOf("/") + 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-download"
            viewBox="0 0 16 16"
          >
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
          </svg>
          <span className="pl-1">Download</span>
        </a>
      </div>
    </div>
  );
}

export default Download;
