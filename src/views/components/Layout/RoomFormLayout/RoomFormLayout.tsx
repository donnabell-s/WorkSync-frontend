import React from 'react';
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
        facilities: string [];
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
    onSubmit,
    onCancel,
    readOnly = false,
}) => {
    return (
        <div className="grid grid-cols-2 gap-6">
            {/* Room Name and Status */}
            <div>
                <label className="block text-sm font-bold text-gray-700">Room Name *</label>
                <input
                    type="text"
                    name="roomName"
                    value={formData.roomName}
                    onChange={onInputChange}
                    readOnly={readOnly}
                    className={`mt-1 p-2 w-[650px] border rounded-md ${
                        readOnly ? 'bg-gray-100' : 'focus:ring-2 focus:ring-blue-500'
                    }`}
                    placeholder={readOnly ? '' : 'Enter Room Name'}
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700">Status *</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={onInputChange}
                    className={`mt-1 p-2 w-[650px] border rounded-md ${
                        readOnly ? 'bg-gray-100' : 'focus:ring-2 focus:ring-blue-500'
                    }`}
                >
                    <option value="Available">Select Room Status</option>
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                </select>
            </div>

            {/* Room Number and Facilities */}
            <div>
                <label className="block text-sm font-bold text-gray-700">Room Number *</label>
                <input
                    type="text"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={onInputChange}
                    readOnly={readOnly}
                    className={`mt-1 p-2 w-[650px] border rounded-md ${
                        readOnly ? 'bg-gray-100' : 'focus:ring-2 focus:ring-blue-500'
                    }`}
                    placeholder={readOnly ? '' : 'Enter Room Number'}
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700">Facilities *</label>
                <select
                    name="facilities"
                    value={formData.facilities}
                    onChange={onInputChange}
                    className={`mt-1 p-2 w-[650px] border rounded-md ${
                        readOnly ? 'bg-gray-100' : 'focus:ring-2 focus:ring-blue-500'
                    }`}
                >
                    <option value="">Select Room Facilities Included</option>
                    <option value="Projector">Projector</option>
                    <option value="Video Conferencing">Video Conferencing</option>
                    <option value="Whiteboard">Whiteboard</option>
                    <option value="Air Conditioner">Air Conditioner</option>
                </select>
            </div>

            {/* Location and Room Image */}
            <div>
                <label className="block text-sm font-bold text-gray-700">Location *</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={onInputChange}
                    readOnly={readOnly}
                    className={`mt-1 p-2 w-[650px] border rounded-md ${
                        readOnly ? 'bg-gray-100' : 'focus:ring-2 focus:ring-blue-500'
                    }`}
                    placeholder={readOnly ? '' : 'Enter Location'}
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700">Room Image *</label>
                <input
                    type="file"
                    name="image"
                    onChange={onImageChange}
                    className={`mt-1 p-2 w-[650px] border rounded-md ${
                        readOnly ? 'bg-gray-100' : 'focus:ring-2 focus:ring-blue-500'
                    }`}
                    placeholder={readOnly ? '' : 'Choose File'}
                />
                {formData.imagePreview && (
                    <div className="mt-2">
                        {/* <img
                            src={formData.imagePreview}
                            alt="Room Preview"
                            className="w-40 h-40 object-cover rounded-md"
                        /> */}
                    </div>
                )}
            </div>

            {/* Floor/Level */}
            <div>
                <label className="block text-sm font-bold text-gray-700">Floor/Level *</label>
                <input
                    type="text"
                    name="floor"
                    value={formData.floor}
                    onChange={onInputChange}
                    readOnly={readOnly}
                    className={`mt-1 p-2 w-[650px] border rounded-md ${
                        readOnly ? 'bg-gray-100' : 'focus:ring-2 focus:ring-blue-500'
                    }`}
                    placeholder={readOnly ? '' : 'Enter Floor/Level'}
                />
            </div>
            <div></div> {/* Empty div to maintain grid alignment */}

            {/*Size*/}
            <div>
                <label className="block text-sm font-bold text-gray-700">Size *</label>
                <select
                    name="size"
                    value={formData.size}
                    onChange={onInputChange}
                    className={`mt-1 p-2 w-[650px] border rounded-md ${
                        readOnly ? 'bg-gray-100' : 'focus:ring-2 focus:ring-blue-500'
                    }`}
                >
                    <option value="">Select Room Size</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                </select>
            </div>
            <div></div> {/* Empty div to maintain grid alignment */}

            {/*Seats*/}
            <div>
                <label className="block text-sm font-bold text-gray-700">Seats *</label>
                <input
                    type="number"
                    name="seats"
                    value={formData.seats}
                    onChange={onInputChange}
                    readOnly={readOnly}
                    disabled={readOnly}
                    className={`mt-1 p-2 w-[650px] border rounded-md ${
                        readOnly ? 'bg-gray-100' : 'focus:ring-2 focus:ring-blue-500'
                    }`}
                    placeholder={readOnly ? '' : 'Enter Number of Seats'}
                />
            </div>
            <div></div> {/* Empty div to maintain grid alignment */}

            {/* Buttons */}
            <div className="col-span-2 flex space-x-4 mt-6">
                {mode === 'add' && (<>
                    <button
                        onClick={onSubmit}
                        className="w-32 bg-blue-600 p-3 text-white text-sm font-semibold rounded-md cursor-pointer hover:bg-blue-700"
                    >
                        SAVE
                    </button>
                    <button
                        onClick={onCancel}
                        className="w-32 bg-gray-400 p-3 text-white text-sm font-semibold rounded-md cursor-pointer hover:bg-gray-500"
                    >
                        CANCEL
                    </button>
                </>
                )}

                {mode === 'edit' && (<>
                    <button
                        onClick={onSubmit}
                        className="w-32 bg-blue-600 p-3 text-white text-sm font-semibold rounded-md cursor-pointer hover:bg-blue-700"
                    >
                        SAVE CHANGES
                    </button>
                    <button
                        onClick={onCancel}
                        className="w-32 bg-gray-400 p-3 text-white text-sm font-semibold rounded-md cursor-pointer hover:bg-gray-500"
                    >
                        CANCEL
                    </button>
                </>
                )}

                {mode === 'delete' && (
                <>
                    <button
                        onClick={onSubmit}
                        className="w-32 bg-red-600 p-3 text-white text-sm font-semibold rounded-md cursor-pointer hover:bg-red-700"
                    >
                        DELETE
                    </button>
                    <button
                        onClick={onCancel}
                        className="w-32 bg-gray-400 p-3 text-white text-sm font-semibold rounded-md cursor-pointer hover:bg-gray-500"
                    >
                        CANCEL
                    </button>
                </>
                )}
            </div>
        </div>
    );
};

export default RoomFormLayout;