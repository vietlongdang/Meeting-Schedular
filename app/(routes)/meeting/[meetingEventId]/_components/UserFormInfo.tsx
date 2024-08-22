import { Input } from "@/components/ui/input";
import React from "react";

function UserFormInfo({ setUserName, setUserEmail, setUserNote }: any) {
  return (
    <div className="p-4 px-8 flex flex-col gap-3">
      <h2 className="font-bold text-xl">Enter Details</h2>
      <div>
        <h2>Name *</h2>
        <Input
          type="text"
          required={true}
          onChange={(event) => setUserName(event.target.value)}
        />
      </div>
      <div>
        <h2>Email *</h2>
        <Input
          type="email"
          required={true}
          onChange={(event) => setUserEmail(event.target.value)}
        />
      </div>
      <div>
        <h2>Share any Notes </h2>
        <Input
          type="text"
          onChange={(event) => setUserNote(event.target.value)}
        />
      </div>
      <div>
        <h2 className="text-xs text-gray-400">
          By Proceeding, you confirm that you read and agree Tubeguruji terms
          and condition
        </h2>
      </div>
    </div>
  );
}

export default UserFormInfo;
