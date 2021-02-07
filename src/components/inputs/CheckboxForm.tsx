import React, { Fragment, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const CheckboxForm = (props: {
  updateVal: any;
  formName: string;
  placeholder: string;
  val: boolean;
  touched?: boolean;
}) => {

  let [value, setValue] = useState<boolean>(false);
  let [error, setError] = useState<string>("");

  useEffect(() => {
    updateValue(props.val);
  }, [props.val]);

  useEffect(() => {
    if (props.touched) {
      handleValidation(value);
    }
  }, [props.touched]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const elemStatus: HTMLInputElement = document.querySelector(`#${props.formName}:checked`) as any;
    const newVal = elemStatus ? true : false;
    handleValidation(newVal);
    updateValue(newVal);
  };

  const updateValue = (val: boolean) => {
    props.updateVal(val, props.formName);
    setValue(val);
  };

  const handleValidation = (val: any) => {
    let formIsValid = true;

    if (!val) {
      formIsValid = false;
      setError("Debe aceptar los términos y condiciones");
      return;
    }

    setError("");
  };

  return (
    <Fragment>
      <div className="form__agreement form__group">
        <div className="agreement">
          <input className="agreement__checkbox" 
            type="checkbox" 
            name={props.formName}
            id={props.formName} 
            onClick={(ev)=> { handleChange(ev) }} 
            defaultChecked={props.val}
            value={1}/>
          <span className="agreement__label"></span>
        </div>
        <span className="text">
          <label className="text__agreement">
            Acepto la
            <a className="text__agreement--link" href="#">
              {props.placeholder}
            </a>
          </label>
        </span>
      {error && <span className="txt-error">{error}</span>}
      </div>

    </Fragment>
  );
};

export default CheckboxForm;
