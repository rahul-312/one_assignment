import React, { useState } from "react";
import { Listing, ListingUpdatePayload } from "@/services/listingService";
import Button from "@/utils/Button";

interface Props {
  listing: Listing;
  onClose: () => void;
  onSave: (id: number, payload: ListingUpdatePayload) => void;
}

const EditListingModal: React.FC<Props> = ({ listing, onClose, onSave }) => {
  const [formData, setFormData] = useState<ListingUpdatePayload>({
    title: listing.title,
    car_name: listing.car_name,
    status: listing.status,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(listing.id, formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Listing #{listing.id}</h2>

        <label className="block text-gray-700 mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded mb-4"
        />

        <label className="block text-gray-700 mb-1">Car Name</label>
        <input
          type="text"
          name="car_name"
          value={formData.car_name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded mb-4"
        />

        <label className="block text-gray-700 mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded mb-4"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditListingModal;
