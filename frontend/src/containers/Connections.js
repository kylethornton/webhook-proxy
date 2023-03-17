import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../lib/errorLib";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import "./Connections.css";

export default function Connections() {
  const { connectionId } = useParams();
  const nav = useNavigate();
  const [connection, setConnection] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [connectionName, setConnectionName] = useState("");
  const [tokenUri, setTokenUri] = useState("");

  function validateForm() {
    return connection.connectionName.length > 0 && connection.tokenUri.length > 0;
  }

  useEffect(() => {
    function loadConnection() {
      return API.get("connections", `/connections/${connectionId}`);
    }

    async function onLoad() {
      try {
        const connection = await loadConnection();

        const {connectionName, tokenUri} = connection;
        setConnection(connection);
        setConnectionName(connectionName);
        setTokenUri(tokenUri);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [connectionId]);

  function saveConnection(connection) {
    return API.put("connections", `/connections/${connectionId}`, {
      body: connection,
    });
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      const updatedConnection = Object.assign(connection, {connectionName, tokenUri});
      await saveConnection(updatedConnection);
      nav("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  
  function deleteConnection() {
    return API.del("connections", `/connections/${connectionId}`);
  }
  
  async function handleDelete(event) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this connection?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsDeleting(true);
  
    try {
      await deleteConnection();
      nav("/");
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  }
  
  return (
    <div className="Connections">
      {connection && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="connectionName">
            <Form.Label>Connection Name</Form.Label>
            <Form.Control
              type="text"
              value={connectionName}
              onChange={(e) => setConnectionName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="tokenUri">
            <Form.Label>Token URI</Form.Label>
            <Form.Control
              type="text"
              value={tokenUri}
              onChange={(e) => setTokenUri(e.target.value)}
            />
          </Form.Group>
          <LoaderButton
            block="true"
            size="lg"
            type="submit"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block="true"
            size="lg"
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </Form>
      )}
    </div>
  );
}