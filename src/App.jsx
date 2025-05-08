import { useState, useMemo, memo } from "react";

function PoliticianList() {
  const [politicians, setPoliticians] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("all");

  const loadUsers = async () => {
    const res = await fetch("http://localhost:5000/politicians");
    const data = await res.json();
    setPoliticians(data);
  };

  const uniquePositions = useMemo(() => {
    const positions = politicians.map((p) => p.position);
    return ["all", ...new Set(positions)];
  }, [politicians]);

  const filteredPoliticians = useMemo(() => {
    return politicians.filter((politician) => {
      const matchesSearch =
        politician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        politician.biography.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPosition =
        selectedPosition === "all" || politician.position === selectedPosition;

      return matchesSearch && matchesPosition;
    });
  }, [politicians, searchTerm, selectedPosition]);

  return (
    <div>
      <div className="search-container">
        <button onClick={loadUsers}>Carica Politici</button>
        <input
          type="text"
          placeholder="Cerca un politico..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
        >
          <option value="all">Tutte le posizioni</option>
          {uniquePositions.map((position) =>
            position !== "all" ? (
              <option key={position} value={position}>
                {position}
              </option>
            ) : null
          )}
        </select>
      </div>
      <div className="cards-container">
        {filteredPoliticians.map((politician) => (
          <Card key={politician.id} politician={politician} />
        ))}
      </div>
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
