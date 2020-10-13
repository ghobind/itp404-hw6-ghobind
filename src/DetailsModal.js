import React from "react";
import { createPortal } from "react-dom";

export default function DetailsModal({ onClose, name, details }) {
  return createPortal(
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{name}'s details</h5>
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
              {details.name != null && <p>Name: {details.name}</p>}
              {details.company != null && <p>Company: {details.company}</p>}
              {details.blog != null && <p>Blog: {details.blog}</p>}
              {details.email != null && <p>Email: {details.email}</p>}
              {details.location != null && <p>Location: {details.location}</p>}
              {details.bio != null && <p>Bio: {details.bio}</p>}
              {details.twitter_username != null && (
                <p>Twitter: {details.twitter_username}</p>
              )}
              {details.public_repos != null && (
                <p>Public Repos: {details.public_repos}</p>
              )}
              {details.followers != null && (
                <p>Followers: {details.followers}</p>
              )}
              {details.following != null && (
                <p>Following: {details.following}</p>
              )}
              {details.public_gists != null && (
                <p>Public Gists: {details.public_gists}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal-container")
  );
}
