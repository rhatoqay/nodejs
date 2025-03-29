import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      // Await the fetch call so that response is resolved
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      // Optionally, parse and log the JSON response
      const data = await response.json();
      console.log(data);

      // Clear the input after successful submit (optional)
      setDescription("");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">pren todo list</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input 
          type="text" 
          className="form-control" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success" type="submit">add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;