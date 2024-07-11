import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

export default function EmptyCart() {
  return (
    <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 z-0">
      <div className="flex justify-center">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            You have no Items in the Cart.{" "}
            <a
              href="app"
              className="font-medium text-yellow-700 underline hover:text-yellow-600"
            >
              Switch to Dishes or Drinks tab.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
