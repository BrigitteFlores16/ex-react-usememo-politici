import { useState, useMemo, memo } from "react";

function PoliticianList() {
  const [politicians, setPoliticians] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadUsers = async () => {
    const res = await fetch("http://localhost:5000/politicians");
    const data = await res.json();
    setPoliticians(data);
  };

  const filteredPoliticians = useMemo(() => {
    return politicians.filter(
      (politician) =>
        politician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        politician.biography.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [politicians, searchTerm]);

  return (
    <div>
      <button onClick={loadUsers}>Carica Politici</button>
      <input
        type="text"
        placeholder="Cerca un politico..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredPoliticians.map((politician) => (
        <Card key={politician.id} politician={politician} />
      ))}
    </div>
  );
}
const Card = memo(
  ({ politician }) => {
    console.log(`Rendering ${politician.name}`);

    return (
      <div className="card">
        <h2>{politician.name}</h2>
        <img src={politician.image} alt={politician.name} />
        <h3>{politician.position}</h3>
        <p>{politician.biography}</p>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.politician === nextProps.politician
);

export default PoliticianList;
