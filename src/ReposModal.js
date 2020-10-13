import React from "react";
import { createPortal } from "react-dom";
import "./App.css";

export default function DetailsModal({ onClose, name, repos }) {
  return createPortal(
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{name}'s Repos</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {repos.map((repo, index) => {
                return (
                  <div className="mb-4" key={repo.name}>
                    <div>
                      <span>{index + 1}) </span>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {repo.name}
                      </a>
                    </div>
                    {repo.description != null && <div>{repo.description}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal-container")
  );
}
