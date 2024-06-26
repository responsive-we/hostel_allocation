import React, { useState } from 'react';

const UploadForm = () => {
  const [allocation, setAllocation] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const groupFile = event.target.groupFile.files[0];
    const hostelFile = event.target.hostelFile.files[0];

    if (!groupFile || !hostelFile) {
      alert('Please upload both files');
      return;
    }

    const formData = new FormData();
    formData.append('groupFile', groupFile);
    formData.append('hostelFile', hostelFile);

    try {
      const response = await fetch('http://localhost:5000/allocate', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setAllocation(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Upload CSV Files</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="groupFile">
            Group Information CSV
          </label>
          <input
            type="file"
            id="groupFile"
            name="groupFile"
            accept=".csv"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hostelFile">
            Hostel Information CSV
          </label>
          <input
            type="file"
            id="hostelFile"
            name="hostelFile"
            accept=".csv"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      {allocation.length > 0 && (
        <div className="mt-6 w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Allocation Results</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2">Group ID</th>
                  <th className="border border-gray-400 px-4 py-2">Hostel Name / Reason</th>
                  <th className="border border-gray-400 px-4 py-2">Room Number</th>
                  <th className="border border-gray-400 px-4 py-2">Members Allocated</th>
                </tr>
              </thead>
              <tbody>
                {allocation.map((alloc, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-400 px-4 py-2">{alloc.GroupID}</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {alloc.Reason ? `Not Allocated (${alloc.Reason})` : alloc.HostelName}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {alloc.Reason ? 'Not Allocated' : alloc.RoomNumber}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">{alloc.MembersAllocated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
