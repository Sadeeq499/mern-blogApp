import React from "react";
import { useState } from "react";
function CommentForm({
  btnText,
  formSubmitHandler,
  CancelHandler,
  initialText,
}) {
  const [value, setValue] = useState(initialText || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    formSubmitHandler(value);
    setValue("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-end border border-primary  rounded-lg p-4">
          <textarea
            className="w-full focus:outline-none bg-transparent"
            placeholder="Write your comment here..."
            rows="5"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex items-center gap-x-2 pt-2">
            {/* cancel button in textArea */}
            {CancelHandler && (
              <button
                onClick={CancelHandler}
                className="px-6 py-2.5 border border-red-700 rounded-lg mt-4"
              >
                Cancel
              </button>
            )}

            {/* submit button in textArea */}
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-white rounded-lg mt-4"
            >
              {btnText}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
