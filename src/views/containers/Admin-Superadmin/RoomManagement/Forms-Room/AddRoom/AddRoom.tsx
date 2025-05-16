import React, { useState } from 'react';
import Header from '../../../../../components/Layout/AdminSuperAdminLayout/Header';
import SideContainer from '../../../../../components/Layout/UserLayout/SideContainer';
import SideNav from '../../../../../components/Layout/AdminSuperAdminLayout/SideNav';
import AdminHeading from '../../../../../components/UI/AdminHeading';
import AdminButton from '../../../../../components/UI/AdminButton';
import AdminFilter from '../../../../../components/UI/AdminFilter';

interface RoomFormData {
  name: string;
  number: string;
  location: string;
  floorLevel: string;
  size: string;
  seats: number;
  status: string;
  facilities: string;
  image: File | null;
}

interface AddRoomProps {
  onAdd: (room: RoomFormData) => void;
  onCancel: () => void;
}

const AddRoom: React.FC<AddRoomProps> = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState<RoomFormData>({
    name: '',
    number: '',
    location: '',
    floorLevel: '',
    size: '',
    seats: 0,
    status: '',
    facilities: '',
    image: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'seats' ? parseInt(value) || 0 : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.number && formData.seats > 0) {
      onAdd(formData);
      setFormData({
        name: '',
        number: '',
        location: '',
        floorLevel: '',
        size: '',
        seats: 0,
        status: '',
        facilities: '',
        image: null,
      });
    }
  };

  return (
    <div className="flex">
      <SideContainer>
        <SideNav nav={true} />
      </SideContainer>
      <div className="flex-1 ml-67">
        <Header nav={true} toggleNav={() => {}} />
        <div className="p-6">
          <AdminHeading label="ADD ROOM" />
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Room Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Room Number *</label>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Floor/Level *</label>
              <input
                type="text"
                name="floorLevel"
                value={formData.floorLevel}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Size *</label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Seats *</label>
              <input
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status *</label>
              <AdminFilter />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Facilities *</label>
              <AdminFilter />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Room Image *</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div className="col-span-2 flex justify-end gap-4 mt-4">
              <AdminButton label="Save" />
              <div onClick={onCancel}>
                <AdminButton label="Cancel" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;