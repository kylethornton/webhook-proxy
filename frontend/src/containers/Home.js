import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../lib/contextLib";
import { onError } from "../lib/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {
  const [connections, setConnections] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad(event) {
      if (!isAuthenticated) {
        return;
      }

      try {
        const connections = await loadConnections();
        setConnections(connections);
      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
    }


    onLoad();
  }, [isAuthenticated]);
  
  function loadConnections() {
    return API.get("connections", "/connections");
  }

  function renderConnectionsList(connections) {
    return (
      <>
        <LinkContainer to="/connections/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ms-2 fw-bold">Create a new connection</span>
          </ListGroup.Item>
        </LinkContainer>
        {connections.map(({ connectionId, connectionName, tokenUri, createdAt }) => (
          <LinkContainer key={connectionId} to={`/connections/${connectionId}`}>
            <ListGroup.Item action className="text-nowrap text-truncate">
              <span className="fw-bold">{connectionName}</span>
              <br />
              <span>{tokenUri}</span>
              <br />
              <span className="text-muted">
                Created: {new Date(createdAt).toLocaleString()}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>KWiPSS</h1>
        <p className="text-muted">the komodo webhook proxy service for salesforce</p>
      </div>
    );
  }


  function renderConnections() {
    return (
      <div className="connections">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Connections</h2>
        <ListGroup>{!isLoading && renderConnectionsList(connections)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderConnections() : renderLander()}
    </div>
  );
}