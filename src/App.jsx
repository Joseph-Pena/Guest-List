import { useState, useEffect } from "react";

async function fetchGuests() {
  const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2601-ftb-ct-web-pt/guests");
  const json = await response.json();
  return json.data;
}

async function fetchGuestById(id) {
  const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2601-ftb-ct-web-pt/guests/${id}`);
  const json = await response.json();
  return json.data;
}

export default function App() {

  const [guests, setGuests] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);

  useEffect(() => {
  async function load() {
    const data = await fetchGuests();
    setGuests(data);
  }
    load();
  }, []);

  useEffect(() => {
    if (selectedId === null) {
      setSelectedGuest(null);
      return;
    }
    async function load() {
    const data = await fetchGuestById(selectedId);
    setSelectedGuest(data);
  }
    load();
  }, [selectedId]);

  return (
  <div style={{ minHeight: "100vh", background: "#c8c8c8", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ background: "white", border: "2px solid #444", borderRadius: "12px", padding: "28px", width: "600px" }}>
    
    <h1 style={{ textAlign: "center" }}>Guest List</h1>
      
      {selectedId !== null ? (
    <div>
      <h2>{selectedGuest?.name}</h2>
      <p><strong>Email:</strong> {selectedGuest?.email}</p>
      <p><strong>Phone:</strong> {selectedGuest?.phone}</p>
      <p><strong>Job:</strong> {selectedGuest?.job}</p>
      <p><strong>Bio:</strong> {selectedGuest?.bio}</p>
      <button onClick={() => setSelectedId(null)}>← Back</button>
    </div>
  ) : (
    <>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr
              key={guest.id}
              onClick={() => setSelectedId(guest.id)}
              style={{
                cursor: "pointer",
                backgroundColor: guest.id === selectedId ? "#ffffaa" : "transparent"
              }}
            >
              <td>{guest.name}</td>
              <td>{guest.email}</td>
              <td>{guest.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Select a guest to see more details.</p>
    </>
  )}

    </div>
  </div>
  );

  // return <></>;
}
