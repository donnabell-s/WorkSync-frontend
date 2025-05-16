import React from 'react';

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
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onFacilitiesChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readOnly?: boolean; // For DeleteRoom, make fields read-only
    children: React.ReactNode; // For buttons (Save, Delete, Cancel)
}

const RoomFormLayout: React.FC<RoomFormProps> = ({
    formData,
    onInputChange,
    onFacilitiesChange,
    onImageChange,
    readOnly = false,
    children,
}) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side: Room Name, Room Number, Location, Floor/Level, Size, Seats */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">ROOM NAME *</label>
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
                    <label className="block text-sm font-medium text-gray-700">STATUS *</label>
                    {readOnly ? (
                        <input
                            type="text"
                            value={formData.status}
                            readOnly
                            className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                        />
                    ) : (
                        <select
                            name="status"
                            value={formData.status}
                            onChange={onInputChange}
                            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Available">Available</option>
                            <option value="Occupied">Occupied</option>
                            <option value="Under Maintenance">Under Maintenance</option>
                        </select>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">ROOM NUMBER *</label>
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
                    <label className="block text-sm font-medium text-gray-700">FACILITIES *</label>
                    {readOnly ? (
                        <input
                            type="text"
                            value={formData.facilities.join(', ')}
                            readOnly
                            className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                        />
                    ) : (
                        <select
                            multiple
                            name="facilities"
                            value={formData.facilities}
                            onChange={onFacilitiesChange}
                            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Projector">Projector</option>
                            <option value="Video Conferencing">Video Conferencing</option>
                            <option value="Whiteboard">Whiteboard</option>
                            <option value="Air Conditioner">Air Conditioner</option>
                        </select>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">LOCATION *</label>
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
                    <label className="block text-sm font-medium text-gray-700">ROOM IMAGE *</label>
                    {readOnly ? (
                        formData.imagePreview && (
                            <div className="mt-2">
                                <img
                                    src={formData.imagePreview}
                                    alt="Room Preview"
                                    className="w-40 h-40 object-cover rounded-md"
                                />
                            </div>
                        )
                    ) : (
                        <>
                            <input
                                type="file"
                                name="image"
                                onChange={onImageChange}
                                className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                            {formData.imagePreview && (
                                <div className="mt-2">
                                    <img
                                        src={formData.imagePreview}
                                        alt="Room Preview"
                                        className="w-40 h-40 object-cover rounded-md"
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">FLOOR/LEVEL *</label>
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
                <div></div> {/* Empty div for grid alignment */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">SIZE *</label>
                    {readOnly ? (
                        <input
                            type="text"
                            value={formData.size}
                            readOnly
                            className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                        />
                    ) : (
                        <select
                            name="size"
                            value={formData.size}
                            onChange={onInputChange}
                            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Room Size</option>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                        </select>
                    )}
                </div>
                <div></div> {/* Empty div for grid alignment */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">SEATS *</label>
                    <input
                        type="number"
                        name="seats"
                        value={formData.seats}
                        onChange={onInputChange}
                        readOnly={readOnly}
                        className={`mt-1 p-2 w-full border rounded-md ${
                            readOnly ? 'bg-gray-100' : 'focus:ring-2 focus:ring-blue-500'
                        }`}
                        placeholder={readOnly ? '' : 'Enter Number of Seats'}
                    />
                </div>
            </div>
            <div className="mt-6 flex gap-4">{children}</div>
        </div>
    );
};

export default RoomFormLayout;