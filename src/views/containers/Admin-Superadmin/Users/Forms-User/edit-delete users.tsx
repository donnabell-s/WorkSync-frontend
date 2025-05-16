import React, { useState } from 'react';

type Mode = 'edit' | 'delete';

interface UserData {
  id: string;
  name: string;
  email: string;
}

interface EditDeleteUserFormProps {
  mode: Mode;
  user: UserData;
  onSubmit: (id: string, updatedData?: Partial<UserData>) => void;
  onClose: () => void;
}

const EditDeleteUserForm: React.FC<EditDeleteUserFormProps> = ({
  mode,
  user,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<Partial<UserData>>({
    name: user.name,
    email: user.email,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (mode === 'edit') {
      onSubmit(user.id, formData);
    } else if (mode === 'delete') {
      onSubmit(user.id);
    }
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{mode === 'edit' ? 'Edit User' : 'Delete User'}</h2>

        {mode === 'edit' ? (
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
              />
            </label>
          </form>
        ) : (
          <p>
            Are you sure you want to <strong>delete</strong> user:{' '}
            <strong>{user.name}</strong>?
          </p>
        )}

        <div className="modal-actions">
          <button onClick={handleSubmit}>
            {mode === 'edit' ? 'Save Changes' : 'Confirm Delete'}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditDeleteUserForm;