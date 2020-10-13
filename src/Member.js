import React, { useEffect, useState } from "react";
import {
  fetchDetails,
  fetchFollowing,
  fetchRepos,
  removeFollowing,
  saveMember,
} from "./api";
import "./App.css";
import DetailsModal from "./DetailsModal";
import ReposModal from "./ReposModal";

export default function Member({ members }) {
  const [isDetailsModalShown, setIsDetailsModalShown] = useState(false);
  const [isReposModalShown, setIsReposModalShown] = useState(false);
  const [name, setName] = useState("");
  const [details, setDetails] = useState();
  const [repos, setRepos] = useState();
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    fetchFollowing().then((following) => {
      setFollowing(following);
      setIsLoading(true);
    });
  }, []);

  function showDetailsModal(name, url) {
    setName(name);
    fetchDetails(url).then((details) => {
      setDetails(details);
      setIsDetailsModalShown(true);
    });
  }
  function hideDetailsModal() {
    setIsDetailsModalShown(false);
  }
  function showReposModal(name, url) {
    setName(name);
    fetchRepos(url).then((repos) => {
      setRepos(repos);
      setIsReposModalShown(true);
    });
  }
  function hideReposModal() {
    setIsReposModalShown(false);
  }

  function changeFollowStatus(member) {
    setIsLoading(false);
    const found = following.find((element) => {
      return element.id === member.id;
    });
    if (found === undefined) {
      saveMember(member).then(() => {
        setFollowing(following.concat(member));
        setIsLoading(true);
      });
    } else {
      removeFollowing(member.id).then(() => {
        const updated = following.filter((mem) => {
          return mem.id !== member.id;
        });
        setFollowing(updated);
        setIsLoading(true);
      });
    }
  }

  function checkFollowStatus(member) {
    if (isLoading) {
      const found = following.find((element) => {
        return element.id === member.id;
      });
      if (found === undefined) {
        return <div>Follow</div>;
      } else {
        return <div>Unfollow</div>;
      }
    }
  }

  return (
    <div>
      {isDetailsModalShown && (
        <DetailsModal
          onClose={hideDetailsModal}
          name={name}
          details={details}
        />
      )}
      {isReposModalShown && (
        <ReposModal onClose={hideReposModal} name={name} repos={repos} />
      )}
      {members.map((group, index) => {
        return (
          <div className="row justify-content-center mb-3" key={index}>
            {group.map((member) => {
              return (
                <div className="col-md text-center" key={member.login}>
                  <img
                    src={member.avatar_url}
                    alt={member.login}
                    width="70%"
                    onClick={() => showDetailsModal(member.login, member.url)}
                    id="member-img"
                  ></img>
                  <div
                    onClick={() => showDetailsModal(member.login, member.url)}
                    id="member-name"
                  >
                    {member.login}
                  </div>
                  <div className="btn-toolbar justify-content-center">
                    <button
                      type="button"
                      className="btn btn-outline-info btn-sm mr-3"
                      onClick={() =>
                        showReposModal(member.login, member.repos_url)
                      }
                    >
                      Repos
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => changeFollowStatus(member)}
                    >
                      {checkFollowStatus(member)}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
