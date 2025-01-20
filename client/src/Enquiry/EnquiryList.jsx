import React from "react";
import { Button, Table } from "flowbite-react";
import axios from "axios";
import { toast } from "react-toastify";

export function EnquiryList({ data, getAllenquiry, Swal, setFormData }) {
  // Handle editing a row
  const editRow = (editid) => {
    axios
      .get(`http://localhost:8020/api/website/enquiry/single/${editid}`)
      .then((res) => {
        const { enquiry } = res.data; // Ensure backend sends data under `enquiry`
        setFormData(enquiry);
        toast.success("Data loaded for editing");
      })
      .catch((err) => {
        console.error("Error fetching single enquiry:", err);
        toast.error("Failed to load enquiry for editing");
      });
  };

  // Handle deleting a row
  const deleteRow = (delid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8020/api/website/enquiry/delete/${delid}`)
          .then((res) => {
            toast.success("Enquiry deleted successfully");
            getAllenquiry(); // Refresh the list
            Swal.fire("Deleted!", "The enquiry has been deleted.", "success");
          })
          .catch((err) => {
            console.error("Error deleting enquiry:", err);
            toast.error("Failed to delete enquiry");
          });
      }
    });
  };

  return (
    <div className="bg-gray-200 p-4">
      <h2 className="text-[20px] font-bold mb-4">Enquiry List</h2>

      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Sr No</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Message</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <Table.Row
                  key={item._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>{item.phone}</Table.Cell>
                  <Table.Cell>{item.message}</Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => editRow(item._id)}
                      color="info"
                      size="xs"
                    >
                      Edit
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => deleteRow(item._id)}
                      color="failure"
                      size="xs"
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell colSpan={7} className="text-center">
                  No Data Found
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default EnquiryList;
