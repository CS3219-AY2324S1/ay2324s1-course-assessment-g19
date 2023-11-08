import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectCurrentUser, updateUser } from '../../features/user/authSlice';
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

  if (!currentUser) return null;

  return (
    <div className="flex flex-col items-center justify-start h-screen p-4 gap-4">
      <h1 className="text-2xl text-white font-semibold">Settings</h1>
      <div className="flex flex-row items-start justify-center w-3/5 gap-4">
        <div className="flex flex-col items-center justify-center w-1/3 bg-neutral-200 rounded-xl shadow-lg p-4 gap-4">
          <h2 className="text-lg font-semibold">User</h2>
          <h2 className="text-lg font-semibold">Game</h2>
        </div>
        <div className="flex flex-col items-center justify-center w-2/3 gap-4">
          <div className="flex flex-col items-center justify-center w-full gap-4 bg-neutral-200 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-center text-lg font-semibold w-full">
              User Profile
            </div>

            <div className="flex flex-row items-center justify-start w-full gap-4">
              <label className="font-semibold w-2/12">Role</label>
              <label className="flex flex-grow">{currentUser.role}</label>
            </div>

            <div className="flex flex-row items-center justify-start w-full gap-4">
              <label className="font-semibold w-2/12">Name</label>
              <input
                className="flex flex-grow rounded-lg p-2 bg-neutral-100"
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
                className="flex flex-grow rounded-lg p-2 bg-neutral-100"
                type="text"
                value={isEditMode ? form.email : currentUser.email}
                placeholder="Please enter your email"
                disabled={!isEditMode}
                onChange={handleChangeEmail}
              />
            </div>

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
                  <label className="font-semibold w-2/12">
                    Confirm Password
                  </label>
                  <input
                    className="flex flex-grow rounded-lg p-2 bg-neutral-100"
                    type="password"
                    value={form.confirmPassword}
                    placeholder="Please re-enter your new password"
                    onChange={handleChangeConfirmPassword}
                  />
                </div>
              </>
            )}
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <button
              className="bg-blue-500 rounded-lg shadow-lg px-4 py-2"
              onClick={toggleMode}
            >
              <label className="text-white font-semibold">
                {isEditMode ? 'CANCEL' : 'EDIT'}
              </label>
            </button>
            {isEditMode && (
              <button
                className="bg-green-500 rounded-lg shadow-lg px-4 py-2"
                onClick={handleSave}
              >
                <label className="text-white font-semibold">SAVE</label>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
