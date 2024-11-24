import { useSolarCalculatorStore } from "@/states/solarcalculator";

export default function CustomerDetails({ nextStep }: { nextStep: () => void }) {
  const { customerDetails, setCustomerDetails } = useSolarCalculatorStore();

  return (
    <div>
      <h2 className="text-2xl mb-4">Customer Details</h2>
      <div className="mb-4">
        <label className="block">Name:</label>
        <input
          type="text"
          value={customerDetails.name}
          onChange={(e) =>
            setCustomerDetails({ ...customerDetails, name: e.target.value })
          }
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">Email:</label>
        <input
          type="email"
          value={customerDetails.email}
          onChange={(e) =>
            setCustomerDetails({ ...customerDetails, email: e.target.value })
          }
          className="border p-2 w-full"
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2" onClick={nextStep}>
        Next
      </button>
    </div>
  );
}
