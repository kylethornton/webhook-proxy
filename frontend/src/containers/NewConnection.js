import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../lib/errorLib";
import { useFormFields } from "../lib/hooksLib";
import { API } from "aws-amplify";

export default function NewNote() {
  const nav = useNavigate();
  const [fields, handleFieldChange] = useFormFields({
    connectionName: "",
    tokenUri: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return fields.connectionName.length > 0 && fields.tokenUri.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await createConnection({
        connectionName: fields.connectionName,
        tokenUri: fields.tokenUri
      });
      nav("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function createConnection(connection) {
    return API.post("connections", "/connections", {
      body: connection,
    });
  }

  return (
    <div className="NewNote">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="connectionName">
          <Form.Label>Connection Name</Form.Label>
          <Form.Control
            value={fields.connectionName}
            type="text"
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="tokenUri">
        <Form.Label>Token URI</Form.Label>
          <Form.Control
            value={fields.torkenUri}
            type="text"
            onChange={handleFieldChange}
          />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </Form>
    </div>
  );
}