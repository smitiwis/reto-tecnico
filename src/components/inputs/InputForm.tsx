import { kMaxLength } from "buffer";
import React, { Fragment, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const InputForm = (props: {
  updateVal: any;
  formName: string;
  type: string;
  maxlength?: number;
  minlength?: number;
  placeholder: string;
  val: string | number;
  touched?: boolean;
}) => {
  let [focusedInput, setFocusedInput] = useState<boolean>(false);
  let [value, setValue] = useState<string | number>("");
  let [error, setError] = useState<string>("");

  useEffect(() => {
    updateValue(props.val);

  }, [props.val]);

  useEffect(() => {
    if (props.touched) {
      handleValidation(value);
    }
  }, [props.touched]);

  const toggleLabel = (state: boolean) => {
    if (!value) {
      focusedInput = state;
    }
    setFocusedInput(focusedInput);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newVal: number | string = event.currentTarget.value;
    updateValue(newVal);
    handleValidation(newVal);
  };

  const updateValue = (val: number | string) => {
    props.updateVal(val, props.formName);
    setValue(val);
  };

  const handleValidation = (val: any) => {
    let formIsValid = true;

    if (!val) {
      formIsValid = false;
      setError('El campo es obligatorio');
      return;
    }

    if (props.minlength && val.length < props.minlength) {
      setError(`El campo debe tener ${props.minlength} dígitos como mínimo`);
      return;
    }

    if (typeof val !== "undefined" && props.type === "number") {
      if (!val.match(/^\d+$/)) {
        formIsValid = false;
        setError('Solo se aceptan números');
        return;
      }
    }

    if (typeof val !== "undefined" && props.type === "text") {
      if (!val.match(/^[A-Za-zÀ-ÿ]+$/)) {
        formIsValid = false;
        setError('Solo se aceptan letras');
        return;
      }
    }

    setError('');
  };

  return (
    <Fragment>
      <div
        className="form__item form__group"
        onClick={() => {
          toggleLabel(true);
        }}
      >
        <label
          className={
            "label label--estatic " +
            (value || focusedInput ? "label--dynamic" : "")
          }
        >
          {props.placeholder}
        </label>
        {!value}
        <input
          className="input input--text"
          id={props.formName}
          value={value}
          onBlur={() => {
            toggleLabel(false);
          }}
          type="text"
          onChange={(event) => {
            handleChange(event);
          }}
          maxLength={props.maxlength}
          minLength={props.minlength}
        />
        {error && <span className="txt-error">{error}</span>}
      </div>
    </Fragment>
  );
};

export default InputForm;
