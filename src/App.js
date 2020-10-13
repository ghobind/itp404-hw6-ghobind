import React, { useEffect, useState } from "react";
import { fetchMembers } from "./api";
import "./App.css";
import Member from "./Member";

function App() {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    fetchMembers().then((members) => {
      // split them into groups of 3 (nested arrays)
      let groups = [],
        i = 0,
        n = members.length;
      while (i < n) {
        groups.push(members.slice(i, (i += 3)));
      }
      setMembers(groups);
    });
  }, []);

  return (
    <div>
      <h1>EmberJS Members</h1>
      <div className="container mt-3">
        <Member members={members} />
      </div>
    </div>
  );
}

export default App;
