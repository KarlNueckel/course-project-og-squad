import React from "react";

export default function StepSection({ formData, setFormData }) {
  const handleStepChange = (index, value) => {
    const newSteps = [...formData.steps];
    newSteps[index].description = value;
    setFormData((prevFormData) => ({ ...prevFormData, steps: newSteps }));
  };

  const handleHeaderChange = (index, value) => {
    const newSteps = [...formData.steps];
    newSteps[index].header = value;
    setFormData((prevFormData) => ({ ...prevFormData, steps: newSteps }));
  };

  const addStep = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      steps: [
        ...prevFormData.steps,
        { header: `Step ${prevFormData.steps.length + 1}`, description: "" },
      ],
    }));
  };

  const removeStep = (index) => {
    if (formData.steps.length === 1) {
      return; // Do not remove if it's the only step
    }
    const newSteps = [...formData.steps];
    newSteps.splice(index, 1);
    setFormData((prevFormData) => ({ ...prevFormData, steps: newSteps }));
  };

  return (
    <>
      {formData.steps.map((step, index) => (
        <div key={index} className="flex flex-col mb-4">
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={step.header === `Step ${index + 1}` ? "" : step.header} // Display default if not changed
              onChange={(e) => handleHeaderChange(index, e.target.value)}
              placeholder={`Step ${index + 1}`} // Placeholder for the input
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <textarea
            rows={3}
            value={step.description}
            onChange={(e) => handleStepChange(index, e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => removeStep(index)}
            className={`mt-2 ${
              formData.steps.length === 1 ? "opacity-50 cursor-not-allowed" : ""
            } bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600`}
            disabled={formData.steps.length === 1}
          >
            Remove Step
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addStep}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Add Step
      </button>
    </>
  );
}
