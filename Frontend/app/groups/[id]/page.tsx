"use client";

import { useParams } from "next/navigation";

const usersData = [
  { id: 1, name: "Ali Khan", email: "ali.khan@example.com", phone: "0301-1234567", role: "Admin", status: "Active", joined: "2024-01-10" },
  { id: 2, name: "Sara Ahmed", email: "sara.ahmed@example.com", phone: "0302-2345678", role: "Manager", status: "Active", joined: "2024-02-12" },
  { id: 3, name: "Bilal Shah", email: "bilal.shah@example.com", phone: "0303-3456789", role: "Viewer", status: "Inactive", joined: "2024-03-14" },
  { id: 4, name: "Hina Tariq", email: "hina.tariq@example.com", phone: "0304-4567890", role: "Manager", status: "Active", joined: "2024-04-16" },
  { id: 5, name: "Omar Farooq", email: "omar.farooq@example.com", phone: "0305-5678901", role: "Viewer", status: "Active", joined: "2024-05-11" },
  { id: 6, name: "Zain Ali", email: "zain.ali@example.com", phone: "0306-6789012", role: "Admin", status: "Inactive", joined: "2024-05-20" },
  { id: 7, name: "Ayesha Riaz", email: "ayesha.riaz@example.com", phone: "0307-7890123", role: "Viewer", status: "Active", joined: "2024-06-01" },
  { id: 8, name: "Imran Malik", email: "imran.malik@example.com", phone: "0308-8901234", role: "Manager", status: "Active", joined: "2024-06-18" },
  { id: 9, name: "Nida Qureshi", email: "nida.qureshi@example.com", phone: "0309-9012345", role: "Admin", status: "Active", joined: "2024-06-21" },
  { id: 10, name: "Faisal Khan", email: "faisal.khan@example.com", phone: "0310-1234500", role: "Viewer", status: "Inactive", joined: "2024-07-05" },
  { id: 11, name: "Sana Mir", email: "sana.mir@example.com", phone: "0311-2234567", role: "Manager", status: "Active", joined: "2024-07-10" },
  { id: 12, name: "Hamza Ali", email: "hamza.ali@example.com", phone: "0312-3345678", role: "Viewer", status: "Active", joined: "2024-07-15" },
  { id: 13, name: "Shahzad Noor", email: "shahzad.noor@example.com", phone: "0313-4456789", role: "Admin", status: "Inactive", joined: "2024-08-01" },
  { id: 14, name: "Maria Zubair", email: "maria.zubair@example.com", phone: "0314-5567890", role: "Manager", status: "Active", joined: "2024-08-07" },
  { id: 15, name: "Junaid Hassan", email: "junaid.hassan@example.com", phone: "0315-6678901", role: "Viewer", status: "Inactive", joined: "2024-08-20" },
  { id: 16, name: "Hassan Raza", email: "hassan.raza@example.com", phone: "0316-7789012", role: "Admin", status: "Active", joined: "2024-09-04" },
  { id: 17, name: "Mehwish Ali", email: "mehwish.ali@example.com", phone: "0317-8890123", role: "Viewer", status: "Active", joined: "2024-09-10" },
  { id: 18, name: "Tahir Javed", email: "tahir.javed@example.com", phone: "0318-9901234", role: "Manager", status: "Active", joined: "2024-09-28" },
  { id: 19, name: "Rubina Khan", email: "rubina.khan@example.com", phone: "0319-1112233", role: "Admin", status: "Inactive", joined: "2024-10-06" },
  { id: 20, name: "Sarmad Rehman", email: "sarmad.rehman@example.com", phone: "0320-2223344", role: "Viewer", status: "Active", joined: "2024-10-14" },
];

export default function OperatorGroupDetails() {
  const params = useParams();
  const groupId = Number(params.id);

  const user = usersData.find(u => u.id === groupId);

  if (!user) return <p className="p-8 text-black">User not found</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-50 py-20">
      <h1 className="text-3xl font-bold text-black mb-4">{user.name}'s Profile</h1>
      <p className="text-black"><strong>Email:</strong> {user.email}</p>
      <p className="text-black"><strong>Phone:</strong> {user.phone}</p>
      <p className="text-black"><strong>Role:</strong> {user.role}</p>
      <p className="text-black"><strong>Status:</strong> {user.status}</p>
      <p className="text-black"><strong>Joined:</strong> {user.joined}</p>
    </div>
  );
}
