import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../firebase';
import { deleteUserFromDb } from '../services/api';
import { useAuth } from '../Pages/AuthContext';
import { toast } from 'react-toastify';

const DeleteAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPassword('');
  };

  const handleDeleteAccount = async () => {
    if (!password) {
      toast.error("Please enter your password to confirm");
      return;
    }

    setLoading(true);
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        toast.error("You must be logged in to delete your account");
        return;
      }

      // Re-authenticate user before deletion
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        password
      );
      await reauthenticateWithCredential(currentUser, credential);

      // Delete from database first
    //   if (user?.uid) {
    //     await deleteUserFromDb(user.uid);
    //   }

      // Then delete from Firebase
      await deleteUser(currentUser);

      // Log out and redirect
      logout();
      toast.success("Your account has been deleted successfully");
      navigate('/');
    } catch (error) {
      console.error("Error deleting account:", error);
      
      if (error.code === 'auth/wrong-password') {
        toast.error("Incorrect password. Please try again.");
      } else {
        toast.error(error.message || "Failed to delete account");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-xl font-semibold text-red-600 mb-2">Danger Zone</h3>
      <p className="text-gray-600 mb-4">
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <button
        onClick={handleOpenModal}
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition"
      >
        Delete Account
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4 text-red-600">Delete Your Account</h3>
            <p className="mb-4 text-gray-700">
              Are you sure you want to delete your account? All of your data including order history and wallet balance will be permanently removed.
            </p>
            <p className="mb-4 text-gray-700 font-bold">
              This action cannot be undone.
            </p>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Enter your password to confirm:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Your password"
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, Delete My Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
