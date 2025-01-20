import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import EnquiryList from "./Enquiry/EnquiryList";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";

const Enquiry = () => {
  const [enquiryList, setEnquiryList] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Flag for editing mode
  const [editId, setEditId] = useState(null); // ID of the enquiry being edited

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Fetch all enquiries
  const getAllenquiry = async () => {
    try {
      const response = await axios.get("http://localhost:8020/api/website/enquiry/view");
      const finalData = response.data;

      if (finalData.status) {
        setEnquiryList(finalData.data);
      } else {
        toast.error("Failed to fetch enquiries");
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      toast.error("Error fetching enquiries");
    }
  };

  // Save or Update enquiry
  const saveEnquiry = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Update logic
        const response = await axios.put(
          `http://localhost:8020/api/website/enquiry/update/${editId}`,
          formData
        );

        if (response.data.status) {
          toast.success("Enquiry updated successfully");
          setIsEditing(false);
          setEditId(null);
        } else {
          toast.error("Failed to update enquiry");
        }
      } else {
        // Create logic
        const response = await axios.post(
          "http://localhost:8020/api/website/enquiry/insert",
          formData
        );

        if (response.data.status) {
          toast.success("Enquiry saved successfully");
        } else {
          toast.error("Failed to save enquiry");
        }
      }

      // Reset form and refresh list
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      getAllenquiry();
    } catch (error) {
      console.error("Error saving enquiry:", error);
      toast.error("Error saving enquiry");
    }
  };

  // Handle input changes
  const getValue = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch enquiries on component mount
  useEffect(() => {
    getAllenquiry();
  }, []);

  return (
    <div>
      <ToastContainer />
      <h1 className="text-[40px] text-center py-6 font-bold">User Enquiry</h1>

      <div className="grid grid-cols-[30%_auto] gap-10">
        {/* Enquiry Form */}
        <div className="bg-gray-200 p-4">
          <h2 className="text-[20px] font-bold">
            {isEditing ? "Edit Enquiry" : "Enquiry Form"}
          </h2>

          <form onSubmit={saveEnquiry}>
            <div className="py-3">
              <Label htmlFor="name" value="Your Name" />
              <TextInput
                type="text"
                value={formData.name}
                onChange={getValue}
                name="name"
                placeholder="Enter Your Name"
                required
              />
            </div>

            <div className="py-3">
              <Label htmlFor="email" value="Your Email" />
              <TextInput
                type="email"
                value={formData.email}
                onChange={getValue}
                name="email"
                placeholder="Enter Your Email"
                required
              />
            </div>

            <div className="py-3">
              <Label htmlFor="phone" value="Your Phone" />
              <TextInput
                type="text"
                value={formData.phone}
                onChange={getValue}
                name="phone"
                placeholder="Enter Your Phone Number"
                required
              />
            </div>

            <div className="py-3">
              <Label htmlFor="message" value="Your Message" />
              <Textarea
                name="message"
                value={formData.message}
                onChange={getValue}
                placeholder="Message..."
                required
                rows={4}
              />
            </div>

            <div className="py-3">
              <Button type="submit" className="w-[100%]">
                {isEditing ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </div>

        {/* Enquiry List */}
        <EnquiryList
          data={enquiryList}
          getAllenquiry={getAllenquiry}
          Swal={Swal}
          setFormData={(data) => {
            setFormData(data);
            setIsEditing(true);
            setEditId(data._id); // Set the ID for the enquiry being edited
          }}
        />
      </div>
    </div>
  );
};

export default Enquiry;

  