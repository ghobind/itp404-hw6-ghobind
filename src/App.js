import React, { useEffect, useState } from "react";
import { fetchFollowing, fetchMembers, saveMember } from "./api";
import "./App.css";
import Member from "./Member";

function App() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
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
