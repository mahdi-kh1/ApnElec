'use client'
// pages/dashboard/profile/index.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface UserProfile {
  name: string;
  email: string;
  role: string;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile>({ name: '', email: '', role: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch profile information for the current user
    axios.get('/api/profile')
      .then(response => setProfile(response.data))
      .catch(error => console.error("Failed to fetch profile", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put('/api/profile', profile);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            disabled
          />
        </div>
        <div>
          <label className="block font-medium">Role</label>
          <input
            type="text"
            name="role"
            value={profile.role}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            disabled
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
