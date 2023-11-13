import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {
  removeUser,
  selectCurrentUser,
  updateUser
} from '../../features/user/authSlice';
import { store } from '../../store';

const Settings = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [mode, setMode] = useState<'VIEW' | 'EDIT'>('VIEW');
  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (currentUser) {
      setForm({
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        password: '',
        confirmPassword: ''
      });
    }
  }, [currentUser]);

  const isEditMode = mode === 'EDIT';

  const toggleMode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (mode === 'VIEW') {
      setMode('EDIT');
    } else {
      setMode('VIEW');
    }
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setForm({ ...form, email: e.target.value });
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setForm({ ...form, name: e.target.value });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setForm({ ...form, password: e.target.value });
  };

  const handleChangeConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setForm({ ...form, confirmPassword: e.target.value });
  };

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await store.dispatch(updateUser(form));
    setMode('VIEW');
  };

  const handleRemove = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this user?'
    );

    if (confirmDelete) {
      await store.dispatch(removeUser(form.id));
      setMode('VIEW');
    }
  };

  if (!currentUser) return null;

  return (
    <div className="flex flex-col justify-start h-screen p-4 gap-4 mt-12 m-32">
      <h1 className="text-2xl text-gray-800 font-semibold bg-gray-400 rounded-lg p-4">
        Settings
      </h1>
      <div className="flex flex-col items-center justify-center w-full gap-4 text-gray-800">
        <div className="flex flex-col items-center justify-center w-full gap-4 bg-gray-400 rounded-lg shadow-lg p-6">
          <div className="flex text-lg font-semibold w-full">User Profile</div>

          <hr className="w-full border-gray-500 m-4" />

          <div className="flex flex-row items-center justify-start w-full gap-4">
            <label className="font-semibold w-2/12">Role</label>
            <label className="flex flex-grow">{currentUser.role}</label>
          </div>

          <div className="flex flex-row items-center justify-start w-full gap-4">
            <label className="font-semibold w-2/12">Name</label>
            <input
              className="flex flex-grow rounded-lg p-2 bg-gray-300"
              type="text"
              value={isEditMode ? form.name : currentUser.name}
              placeholder="Please enter your name"
              disabled={!isEditMode}
              onChange={handleChangeName}
            />
          </div>

          <div className="flex flex-row items-center justify-start w-full gap-4">
            <label className="font-semibold w-2/12">Email</label>
            <input
              className="flex flex-grow rounded-lg p-2 bg-gray-300"
              type="text"
              value={isEditMode ? form.email : currentUser.email}
              placeholder="Please enter your email"
              disabled={!isEditMode}
              onChange={handleChangeEmail}
            />
          </div>

          <hr className="w-full border-gray-500 m-4" />

          {isEditMode && (
            <>
              <div className="flex flex-row items-center justify-start w-full gap-4">
                <label className="font-semibold w-2/12">Password</label>
                <input
                  className="flex flex-grow rounded-lg p-2 bg-neutral-100"
                  type="password"
                  value={form.password}
                  placeholder="Please enter a new password"
                  onChange={handleChangePassword}
                />
              </div>

              <div className="flex flex-row items-center justify-start w-full gap-4">
                <label className="font-semibold w-2/12">Confirm Password</label>
                <input
                  className="flex flex-grow rounded-lg p-2 bg-neutral-100"
                  type="password"
                  value={form.confirmPassword}
                  placeholder="Please re-enter your new password"
                  onChange={handleChangeConfirmPassword}
                />
              </div>

              <hr className="w-full border-gray-500 m-4" />
            </>
          )}

          <div className="flex flex-row w-full justify-end gap-4">
            {isEditMode && (
              <>
                <button
                  className="bg-gray-100 rounded-lg shadow-lg px-6 py-2 hover:scale-95 transition"
                  onClick={handleSave}
                >
                  <label className="text-gray-800 font-semibold cursor-pointer">
                    Save Details
                  </label>
                </button>

                <button
                  className="bg-rose-700 rounded-lg shadow-lg px-6 py-2 hover:scale-95 transition"
                  onClick={handleRemove}
                >
                  <label className="text-gray-800 font-semibold cursor-pointer">
                    Delete Account
                  </label>
                </button>
              </>
            )}
            <button
              className="bg-blue-500 rounded-lg shadow-lg px-6 py-2 hover:scale-95 transition"
              onClick={toggleMode}
            >
              <label className="text-white cursor-pointer font-semibold">
                {isEditMode ? 'Cancel' : 'Edit'}
              </label>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
