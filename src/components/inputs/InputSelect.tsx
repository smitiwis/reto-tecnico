import { Fragment, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const InputSelect = (props: {
  updateVal: any;
  formNameInput: string;
  formNameSelect: string;
  type: string;
  placeholder: string;
  touched?: boolean;
  valSelect: number;
  valInput: string;
}) => {
  const [maxlength, setMaxlength] = useState<number>(8);
  const [minlength, setMinlength] = useState<number>(8);
  let [focusedInput, setFocusedInput] = useState(false);
  let [valueInput, setValInput] = useState<string>('');
  let [valueSelect, setValSelect] = useState<string | number>(1);
  let [error, setError] = useState<string>("");
 


  useEffect(() => {
    updateValueInput(props.valInput);
    updateValueSelect(props.valSelect);
  }, [props.valInput, props.valSelect]);

  useEffect(() => {
    if (props.touched) {
      handleValidation(valueInput);
    }
  }, [props.touched]);

  const toggleLabel = (state: boolean) => {
    if (!valueInput) {
      focusedInput = state;
    }
    setFocusedInput(focusedInput);
  };

  const handleChangeInput = (ev: React.FormEvent<HTMLInputElement>) => {
    const newVal = ev.currentTarget.value;
    updateValueInput(newVal);
    handleValidation(newVal);
  };

  const handleChangeSelect = (ev: React.FormEvent<HTMLSelectElement>) => {
    const newVal: string = ev.currentTarget.value;
    updateValueSelect(newVal);
  };

  const updateValueInput = (val: string) => {
    props.updateVal(val, props.formNameInput);
    setValInput(val);
  };

  const updateValueSelect = (val: string | number) => {
    props.updateVal(val, props.formNameSelect);
    setValSelect(val);
    if (val == '1') {
      setMinlength(8);
      setMaxlength(8);
    } else {
      setMaxlength(11);
      setMinlength(11);
    }
  };

  const handleValidation = (val: any) => {
    let formIsValid = true;

    if (!val) {
      formIsValid = false;
      setError("El campo es obligatorio");
      return;
    }

    if (typeof val !== "undefined" && props.type === "text") {
      if (!val.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        setError("Solo se aceptan letras");
        return;
      }
    }

    if (minlength && val.length !== minlength) {
      setError(`El campo debe tener ${minlength} dígitos`);
      debugger
      return;
    }

    if (typeof val !== "undefined" && props.type === "number") {
      if (!(val.toString()).match(/^\d+$/)) {
        formIsValid = false;
        setError("Solo se aceptan números");
        return;
      }
    }

    setError("");
  };

  return (
    <Fragment>
      <div className="form__group inline-flex">
        <div className="form__item form__item--border-left w-3">
          <select
            className="select"
            value={valueSelect}
            name={props.formNameSelect}
            id={props.formNameSelect}
            onChange={(ev) => {
              handleChangeSelect(ev);
            }}
          >
            <option className="select__option" value={1}>
              DNI
            </option>
            <option className="select__option" value={2}>
              RUC
            </option>
          </select>
        </div>

        <div
          className="form__item form__item--border-right w-7"
          onClick={() => {
            toggleLabel(true);
          }}>
          <span className="value-input"></span>
          <label
            className={
              "label label--estatic " +
              (valueInput || focusedInput ? "label--dynamic" : "")
            }
          >
            {props.placeholder}
          </label>
          <input
            className="input input--number"
            id={props.formNameInput}
            onBlur={() => {
              toggleLabel(false);
            }}
            minLength={minlength}
            maxLength={maxlength}
            value={valueInput}
            onChange={(ev) => {
              handleChangeInput(ev);
            }}
          />
          
        </div>
        <br/>
        {error && <span className="txt-error">{error}</span>}
      </div>
     
    </Fragment>
  );
};

export default InputSelect;
