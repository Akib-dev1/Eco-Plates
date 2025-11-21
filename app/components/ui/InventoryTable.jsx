// components/dashboard/InventoryTable.jsx
"use client";

import { useEffect, useState } from "react";
import AddInventoryModal from "./AddInventoryModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function InventoryTable({
  items: initialItems,
  mainInventoryData,
}) {
  //   const [items, setItems] = useState(initialItems || []);
  const items = initialItems || [];
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // keep local state in sync with server/parent if needed
  //   useEffect(() => {
  //     setItems(initialItems || []);
  //   }, [initialItems]);

  const handleAddItemClick = () => {
    setIsModalOpen(true);
  };

  const handleAddItem = async (newItem) => {
    const res = await fetch("http://localhost:3000/api/inventoryUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

    const addedItem = await res.json();

    if (addedItem.insertedId) {
      toast.success("Item added to inventory!");
      router.refresh();
    } else {
      console.error("Failed to add item");
    }
  };

  const handleEditItem = (item) => {
    console.log("edit inventory item", item);
    // TODO: open edit modal / form
  };

  const handleDeleteItem = async (item) => {
    console.log("delete inventory item", item);
    const res = await fetch(
      `http://localhost:3000/api/inventoryUsers/${item}`,
      {
        method: "DELETE",
      }
    );
    const result = await res.json();
    if (result.deletedCount === 1) {
      toast.success("Item deleted from inventory!");
      router.refresh();
    } else {
      toast.error("Failed to delete item");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg sm:text-xl font-oswald text-input-text">
          Inventory List
        </h2>
        <button
          type="button"
          onClick={handleAddItemClick}
          className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-primary-btn-bg text-primary-btn-text border border-neutral-600 hover:bg-neutral-900 hover:border-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-accent cursor-pointer"
        >
          + Add New Item
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-[#181818]">
        <table className="min-w-full text-left text-xs sm:text-sm text-input-text">
          <thead className="bg-[#202020] text-neutral-300">
            <tr>
              <th className="px-4 py-3 font-medium">Item Name</th>
              <th className="px-4 py-3 font-medium">Quantity</th>
              <th className="px-4 py-3 font-medium">Date Added</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr
                key={item._id}
                className={
                  idx % 2 === 0
                    ? "bg-transparent"
                    : "bg-[rgba(255,255,255,0.02)]"
                }
              >
                <td className="px-4 py-3 whitespace-nowrap">{item.name}</td>
                <td className="px-4 py-3 whitespace-nowrap">{item.quantity}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.dateAdded}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditItem(item)}
                      className="px-2 py-1 rounded-md text-xs bg-[#262626] text-neutral-200 border border-neutral-600 hover:bg-neutral-800 focus-visible:outline-none.focus-visible:ring-2 focus-visible:ring-lime-300 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item._id)}
                      className="px-2 py-1 rounded-md text-xs bg-transparent text-red-300 border border-red-500/60 hover:bg-red-600/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-4 text-center text-neutral-400"
                >
                  No items in inventory yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AddInventoryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddItem}
        mainInventoryData={mainInventoryData}
      />
    </div>
  );
}
