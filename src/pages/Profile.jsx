import React from 'react';

function Profile() {
  // Simulate user data from localStorage or context
  const email = localStorage.getItem('userEmail') || 'demo@user.com';
  const joinDate = localStorage.getItem('joinDate') || '2025-06-25';

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-10">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">👤 User Profile</h2>

        <div className="space-y-2">
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Joined:</strong> {joinDate}</p>
          <p><strong>Status:</strong> Logged In</p>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          This is your personal profile section. More features coming soon!
        </div>
      </div>
    </div>
  );
}

export default Profile;
