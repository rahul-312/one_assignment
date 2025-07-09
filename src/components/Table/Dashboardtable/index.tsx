// components/Dashboard/Table.tsx
import React, { useEffect, useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import listingService, {
  Listing,
  ListingUpdatePayload,
} from "@/services/listingService";
import EditListingModal from "./EditListingModal";

const PAGE_SIZE = 10;

const Table: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingListing, setEditingListing] = useState<Listing | null>(null);

  const fetchListings = async (page = 1) => {
    try {
      setLoading(true);
      const data = await listingService.getListings(page, PAGE_SIZE);
      setListings(data.results);
      setTotalCount(data.count);
    } catch (err: any) {
      setError(err.message || "Failed to fetch listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings(currentPage);
  }, [currentPage]);

  const handleStatusChange = async (
    id: number,
    status: "approved" | "rejected"
  ) => {
    try {
      await listingService.updateStatus(id, status);
      await fetchListings(currentPage);
    } catch (err: any) {
      alert(err.message || "Failed to update status");
    }
  };

  const handleEdit = (id: number) => {
    const listing = listings.find((l) => l.id === id);
    if (listing) setEditingListing(listing);
  };

  const handleSave = async (id: number, payload: ListingUpdatePayload) => {
    try {
      await listingService.updateListing(id, payload);
      setEditingListing(null);
      await fetchListings(currentPage);
    } catch (err: any) {
      alert(err.message || "Failed to update listing");
    }
  };

  const columns = useMemo<ColumnDef<Listing>[]>(() => [
    {
      accessorKey: "id",
      header: "Listing ID",
    },
    {
      accessorKey: "car_name",
      header: "Car Name",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        const status = info.getValue() as string;
        const color =
          status === "approved"
            ? "text-green-600"
            : status === "rejected"
            ? "text-red-600"
            : "text-yellow-600";
        return (
          <span className={`${color} font-semibold capitalize`}>
            {status}
          </span>
        );
      },
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <div className="space-x-2">
            <button
              className="text-green-600 hover:underline"
              onClick={() => handleStatusChange(id, "approved")}
            >
              Approve
            </button>
            <button
              className="text-red-600 hover:underline"
              onClick={() => handleStatusChange(id, "rejected")}
            >
              Reject
            </button>
            <button
              className="text-blue-600 hover:underline"
              onClick={() => handleEdit(id)}
            >
              Edit
            </button>
          </div>
        );
      },
    },
  ], [listings]);

  const table = useReactTable({
    data: listings,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  if (loading) return <p className="mt-20 text-center">Loading listings...</p>;
  if (error) return <p className="mt-20 text-center text-red-600">{error}</p>;

  return (
    <div className="mt-20 px-4">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow">
          <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-4 border border-gray-300">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-sm text-gray-600">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4 border border-gray-300">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page <strong>{currentPage}</strong> of{" "}
          <strong>{totalPages}</strong>
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {editingListing && (
        <EditListingModal
          listing={editingListing}
          onClose={() => setEditingListing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Table;
