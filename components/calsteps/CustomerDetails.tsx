import { useState } from "react";

// Define the props types
interface CustomerDetailsProps {
  nextStep: () => void;
  setCustomerDetails: (details: {
    name: string;
    address: string;
    telephone: string;
    email: string;
    installationAddress: string;
  }) => void;
}

export default function CustomerDetails({ nextStep, setCustomerDetails }: CustomerDetailsProps) {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [sameAsCustomer, setSameAsCustomer] = useState<boolean>(true);
  const [installationAddress, setInstallationAddress] = useState<string>("");

  const handleNext = () => {
    setCustomerDetails({
      name,
      address,
      telephone,
      email,
      installationAddress: sameAsCustomer ? address : installationAddress,
    });
    nextStep();
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">Customer Details</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border-b-2 border-slate-400 p-2 focus:border-blue-500 outline-none"
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border-b-2 border-slate-400 p-2 focus:border-blue-500 outline-none"
      />
      <input
        type="text"
        placeholder="Telephone"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
        className="border-b-2 border-slate-400 p-2 focus:border-blue-500 outline-none"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-b-2 border-slate-400 p-2 focus:border-blue-500 outline-none"
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={sameAsCustomer}
          onChange={() => setSameAsCustomer(!sameAsCustomer)}
        />
        <label>Same as Customer Address</label>
      </div>

      {!sameAsCustomer && (
        <input
          type="text"
          placeholder="Installation Address"
          value={installationAddress}
          onChange={(e) => setInstallationAddress(e.target.value)}
          className="border-b-2 border-slate-400 p-2 focus:border-blue-500 outline-none"
        />
      )}

      <button
        onClick={handleNext}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Next
      </button>
    </div>
  );
}
