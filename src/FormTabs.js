import "./styles.css";
import { useGlobalContext } from "./GlobalContext";

export default function FormTabs() {
  const { formConfig, setFormConfig, currentPage, setCurrentPage } =
    useGlobalContext();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormConfig((prevConfig) => {
      return {
        ...prevConfig,
        [currentPage]: prevConfig[currentPage].map((field) => {
          if (field.name === name) {
            if (type === "checkbox") {
              const updatedValue = checked
                ? [...field.value, value]
                : field.value.filter((v) => v !== value);
              return { ...field, value: updatedValue };
            }
            return { ...field, value };
          }
          return field;
        }),
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newObj = {};
    console.log("formConfig", formConfig);
    Object.keys(formConfig).forEach((single) => {
      const singleItemValue = formConfig[single];

      singleItemValue.forEach((subItem) => {
        newObj[subItem.name] = subItem.value;
      });
    });
    console.log("newObj", newObj);
  };

  const renderInput = ({
    label,
    name,
    value,
    type,
    options,
    validation,
    errorMessage,
  }) => {
    switch (type) {
      case "text":
      case "email":
      case "number":
        return (
          <>
            <div className="gap10" key={name}>
              <label htmlFor={name}>{label}</label>
              <div className="inputNError">
                <input
                  type={type}
                  name={name}
                  value={value || ""}
                  onChange={handleChange}
                />
                <div className="errorMessage" id={`error-${name}`}></div>
              </div>
            </div>
          </>
        );
      case "checkbox":
        return (
          <>
            <div key={name}>
              {options.map((single) => (
                <div className="gap10" key={single}>
                  <div className="inputNError">
                    <input
                      type="checkbox"
                      id={`${name}-${single}`}
                      name={name}
                      value={single}
                      checked={value.includes(single)}
                      onChange={handleChange}
                    />
                  </div>
                  <label htmlFor={`${name}-${single}`}>{single}</label>
                </div>
              ))}
              <div className="errorMessage" id={`error-${name}`}></div>
            </div>
          </>
        );
      case "radio":
        return (
          <>
            <div key={name}>
              {options.map((single) => (
                <div className="gap10" key={single}>
                  <div className="inputNError">
                    <input
                      type="radio"
                      id={`${name}-${single}`}
                      name={name}
                      value={single}
                      checked={value === single}
                      onChange={handleChange}
                    />
                    <div className="errorMessage" id={`error-${name}`}></div>
                  </div>
                  <label htmlFor={`${name}-${single}`}>{single}</label>
                </div>
              ))}
            </div>
          </>
        );
    }
  };

  const changePage = (page) => {
    const validationCheck = [];
    formConfig[currentPage].forEach((single) => {
      if (single.validation) {
        if (!single.validation(single.value)) {
          const domEl = document.getElementById(`error-${single.name}`);
          domEl.innerHTML = single.errorMessage;
          validationCheck.push(single.errorMessage);
        }
      }
    });

    if (!validationCheck.length > 0) setCurrentPage(page);
  };

  return (
    <div className="FormTabs">
      <div className="tabs">
        {Object.keys(formConfig).map((single, i) => (
          <div key={i}>
            <button onClick={() => changePage(single)}>{single}</button>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="formItems">
          {formConfig[currentPage].map(renderInput)}
          {currentPage === "Settings" && <input type="submit" value="Submit" />}
        </div>
      </form>
    </div>
  );
}
