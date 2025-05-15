import React, { useState } from 'react';

type Mode = 'edit' | 'delete';

interface AdminData {
  id: string;
  name: string;
  email: string;
}

interface EditDeleteAdminFormProps {
  mode: Mode;
  admin: AdminData;
  onSubmit: (id: string, updatedData?: Partial<AdminData>) => void;
  onClose: () => void;
}

const EditDeleteAdminForm: React.FC<EditDeleteAdminFormProps> = ({
  mode,
  admin,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<Partial<AdminData>>({
    name: admin.name,
    email: admin.email,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (mode === 'edit') {
      onSubmit(admin.id, formData);
    } else if (mode === 'delete') {
      onSubmit(admin.id);
    }
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{mode === 'edit' ? 'Edit Admin' : 'Delete Admin'}</h2>

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
            Are you sure you want to <strong>delete</strong> admin:{' '}
            <strong>{admin.name}</strong>?
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

export default EditDeleteAdminForm;