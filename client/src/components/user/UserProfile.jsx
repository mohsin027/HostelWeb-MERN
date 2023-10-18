import React, { useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditUserProfileModal from "../../modal/EditUserProfileModal";
import { RiImageEditFill } from "react-icons/ri";
import EditImageModal from "../../modal/EditImageModal";
import moment from "moment";

export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { user } = useSelector((state) => state.auth.user);

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="pt-2">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <Link to="/">Home</Link>
              </MDBBreadcrumbItem>
              {/* <MDBBreadcrumbItem>
                <a href="#">User</a>
              </MDBBreadcrumbItem> */}
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <div className="w-100 d-flex justify-content-center">
                  <MDBCardImage
                    src={
                      user.image?.url ??
                      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    }
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px" }}
                    fluid
                  />
                  <RiImageEditFill
                    type="button"
                    size="35"
                    onClick={() => setEditOpen(true)}
                    style={{ position: "absolute", marginRight: "-120px" }}
                  ></RiImageEditFill>
                </div>
                <p className="text-muted mb-1 mt-1">
                  {user?.fullName || "FullName"}
                </p>
                <p className="text-muted mb-4">{user?.address || "address"}</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn onClick={() => setOpen(true)}>Edit</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user?.fullName}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user?.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Gender</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user?.gender}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user?.contactNumber}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Registered on</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {moment(user?.createdAt).format("DD-MM-YYYY")}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user?.address}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow></MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <EditUserProfileModal open={open} setOpen={setOpen} />
      <EditImageModal open={editOpen} setOpen={setEditOpen} />
    </section>
  );
}
