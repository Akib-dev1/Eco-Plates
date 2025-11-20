"use client";

export default function InventoryDetails({ item }) {
  if (!item) {
    return (
      <aside className="rounded-xl bg-primary-accent text-input-text p-4 text-center">
        Select an item to view details.
      </aside>
    );
  }

  return (
    <aside className="rounded-xl bg-primary-accent text-input-text p-5 space-y-4">
      <h2 className="font-oswald text-lg">Item Details</h2>

      <div className="space-y-2 text-sm">
        <div>
          <p className="text-neutral-400 text-xs">Name</p>
          <p className="font-medium">{item.name}</p>
        </div>

        <div>
          <p className="text-neutral-400 text-xs">Category</p>
          <p className="font-medium">{item.category}</p>
        </div>

        <div>
          <p className="text-neutral-400 text-xs">Quantity</p>
          <p className="font-medium">
            {item.quantity} {item.unit}
          </p>
        </div>

        <div>
          <p className="text-neutral-400 text-xs">Typical Expiration</p>
          <p className="font-medium">{item.expirationDays} days</p>
        </div>

        <div>
          <p className="text-neutral-400 text-xs">Cost per Unit</p>
          <p className="font-medium">
            Tk {item.costPerUnit.toLocaleString()} / {item.unit}
          </p>
        </div>
      </div>
    </aside>
  );
}
