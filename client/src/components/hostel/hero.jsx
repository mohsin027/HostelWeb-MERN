import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddHostelModal from "../../modal/AddHostelModal";
import { MDBBtn } from "mdb-react-ui-kit";

export default function HeroImage({hostel}) {
  const [open, setOpen] = useState(false);
  return (
    <header style={{ paddingLeft: 0 }}>
    <AddHostelModal  open={open} setOpen={setOpen} />
      
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">Welcome world of opportunities</h1>
              <h4 className="mb-3">You can list your hostel</h4>
              
                <MDBBtn onClick={() => setOpen(true)}>Add Hostel</MDBBtn>
            </div>
          </div>
        
      </div>
    </header>
  );
}
