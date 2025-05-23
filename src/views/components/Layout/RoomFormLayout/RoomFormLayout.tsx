import React, { useState } from 'react';
import AdminBackLink from '../../UI/AdminBackLink';

type RoomFormMode = 'add' | 'edit' | 'delete';

interface RoomFormProps {
    formData: {
        roomName: string;
        roomNumber: string;
        location: string;
        floor: string;
        size: string;
        seats: string;
        status: string;
        facilities: string[];
        image: File | null;
        imagePreview: string;
    };
    mode: RoomFormMode;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    onCancel: () => void;
    onDelete?: () => void;
    onSaveChanges?: () => void;
    readOnly?: boolean;
    children: React.ReactNode;
}

const RoomFormLayout: React.FC<RoomFormProps> = ({
    mode,
    formData,
    onInputChange,
    onImageChange,
    readOnly = false,
    children,
}) => {
    const [isFacilitiesOpen, setIsFacilitiesOpen] = useState(false);

    const facilityOptions = [
        'Projector',
        'Video Conferencing',
        'Whiteboard',
        'Air Conditioner',
    ];

    const handleFacilityChange = (facility: string) => {
        const updatedFacilities = formData.facilities.includes(facility)
            ? formData.facilities.filter(f => f !== facility)
            : [...formData.facilities, facility]; 

        const event = {
            target: {
                name: 'facilities',
                value: updatedFacilities,
            },
        } as unknown as React.ChangeEvent<HTMLSelectElement>;

        onInputChange(event);
    };

    return (
        <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700">Room Name *</label>
                    <input
                        type="text"
                        name="roomName"
                        value={formData.roomName}
                        onChange={onInputChange}
                        readOnly={readOnly}
                        className={`mt-1 p-2 w-full border rounded-md ${
                            readOnly ? 'bg-gray-100' : 'focus:ring-2 focus:ring-blue-500'
                        }`}
                        placeholder={readOnly ? '' : 'Enter Room Name'}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700">Room Number *</label>
                    <input
                        type="text"
                        name="roomNumber"
                        value={formData.roomNumber}
                        onChange={onInputChange}
                        readOnly={readOnly}
                        className={`mt-1 p-2 w-full border rounded-md ${
                            readOnly ? 'bg-gray-100' : 'focus:ring-2 focus:ring-blue-500'
                        }`}
                        placeholder={readOnly ? '' : 'Enter Room Number'}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700">Location *</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={onInputChange}
                        readOnly={readOnly}
                        className={`mt-1 p-2 w-full border rounded-md ${
                            readOnly ? 'bg-gray-100' : 'focus:ring-2 focus:ring-blue-500'
                        }`}
                        placeholder={readOnly ? '' : 'Enter Location'}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700">Floor/Level *</label>
                    <input
                        type="text"
                        name="floor"
                        value={formData.floor}
                        onChange={onInputChange}
                        readOnly={readOnly}
                        className={`mt-1 p-2 w-full border rounded-md ${
                            readOnly ? 'bg-gray-100' : 'focus:ring-2 focus:ring-blue-500'
                        }`}
                        placeholder={readOnly ? '' : 'Enter Floor/Level'}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700">Size *</label>
                    <select
                        name="size"
                        value={formData.size}
                        onChange={onInputChange}
                        className={`mt-1 p-2 w-full border rounded-md ${
                            readOnly ? 'bg-gray-100' : 'focus:ring-2 focus:ring-blue-500'
                        }`}
                        disabled={readOnly}
                    >
                        <option value="">Select Room Size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700">Seats *</label>
                    <input
                        type="number"
                        name="seats"
                        value={formData.seats}
                        onChange={onInputChange}
                        readOnly={readOnly}
                        disabled={readOnly}
                        className={`mt-1 p-2 w-full border rounded-md ${
                            readOnly ? 'bg-gray-100' : 'focus:ring-2 focus:ring-blue-500'
                        }`}
                        placeholder={readOnly ? '' : 'Enter Number of Seats'}
                    />
                </div>
            </div>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700">Status *</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={onInputChange}
                        className={`mt-1 p-2 w-full border rounded-md ${
                            readOnly ? 'bg-gray-100' : 'focus:ring-2 focus:ring-blue-500'
                        }`}
                        disabled={readOnly}
                    >
                        <option value="Available">Select Room Status</option>
                        <option value="Available">Available</option>
                        <option value="Occupied">Occupied</option>
                        <option value="Under Maintenance">Under Maintenance</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700">Facilities *</label>
                    {mode === 'delete' ? (
                        <input
                            type="text"
                            value={formData.facilities.join(', ')}
                            readOnly
                            className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                        />
                    ) : (
                        <div className="relative mt-1">
                            <button
                                type="button"
                                className={`p-2 w-full border rounded-md text-left ${
                                    readOnly ? 'bg-gray-100' : 'focus:ring-2 focus:ring-blue-500'
                                }`}
                                onClick={() => setIsFacilitiesOpen(!isFacilitiesOpen)}
                                disabled={readOnly}
                            >
                                {formData.facilities.length > 0
                                    ? formData.facilities.join(', ')
                                    : 'Select Facilities'}
                            </button>
                            {isFacilitiesOpen && (
                                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                                    {facilityOptions.map(facility => (
                                        <label
                                            key={facility}
                                            className="flex items-center p-2 hover:bg-gray-100"
                                        >
                                            <input
                                                type="checkbox"
                                                value={facility}
                                                checked={formData.facilities.includes(facility)}
                                                onChange={() => handleFacilityChange(facility)}
                                                className="mr-2"
                                                disabled={readOnly}
                                            />
                                            {facility}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700">Room Image *</label>
                    <div className="mt-1">
                        {formData.imagePreview ? (
                            <img
                                src={formData.imagePreview}
                                alt="Room Preview"
                                className="w-200 h-100 object-cover rounded-md border"
                            />
                        ) : (
                            <input
                                type="file"
                                name="image"
                                onChange={onImageChange}
                                className={`p-2 w-full border rounded-md ${
                                    readOnly ? 'bg-gray-100' : 'focus:ring-2 focus:ring-blue-500'
                                }`}
                                disabled={readOnly}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="col-span-2 flex space-x-4 mt-6">
                {children}
            </div>
        </div>
    );
};

export default RoomFormLayout;