import React from "react";

// Text Block Component
const TextBlock = ({ schema }) => (
  <div className="p-4 border border-gray-300 rounded bg-white">
    <h2 className="text-lg font-semibold mb-2">{schema.title}</h2>
    <p>{schema.content}</p>
  </div>
);

// Button Component with sandboxed actions
const ButtonComponent = ({ schema }) => {
  const safeActions = {
    alert: () => alert("Button clicked!"),
    log: () => console.log("Button clicked"),
    submitForm: () => alert("Form would be submitted!"),
    // Add more safe predefined actions as needed
  };

  const handleClick = () => {
    const action = schema.onClick;
    if (safeActions[action]) {
      safeActions[action]();
    } else {
      alert("Invalid or unsupported action!");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-600 text-white px-4 py-2 rounded-md mt-2"
    >
      {schema.label}
    </button>
  );
};

// Form Field Renderer
const FormField = ({ field }) => {
  const baseClasses = "w-full px-3 py-2 border rounded mb-3";

  switch (field.type) {
    case "text":
    case "email":
      return (
        <div>
          <label className="block mb-1">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            className={baseClasses}
          />
        </div>
      );
    case "textarea":
      return (
        <div>
          <label className="block mb-1">{field.label}</label>
          <textarea
            name={field.name}
            placeholder={field.placeholder}
            className={baseClasses}
          />
        </div>
      );
    case "submit":
      return (
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {field.label}
        </button>
      );
    default:
      return <div>Unsupported field type: {field.type}</div>;
  }
};

// Form Component
const FormComponent = ({ schema }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted (mock handler)!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border border-gray-300 rounded bg-white">
      <h2 className="text-lg font-semibold mb-4">{schema.title}</h2>
      {schema.fields.map((field, idx) => (
        <FormField key={idx} field={field} />
      ))}
    </form>
  );
};

// Main component library mapping
const ComponentLibrary = {
  form: FormComponent,
  text: TextBlock,
  button: ButtonComponent,
};

export default ComponentLibrary;
