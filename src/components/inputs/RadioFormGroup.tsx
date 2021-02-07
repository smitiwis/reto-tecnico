import React, { Fragment, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { RadioItem } from "../../models/general";

const RadioFormGroup = (props: {
  updateVal: any;
  formName: string;
  placeholder: string;
  val: number;
  items: RadioItem[];
  touched: boolean;
}) => {
  let [value, setValue] = useState<number | null>(null);
  let [error, setError] = useState<string>("");

  useEffect(() => {
    updateValue(props.val);
  }, [props.val]);

  useEffect(() => {
    if (props.touched) {
      handleValidation(value);
    }
  }, [props.touched]);

  const handleChange = (newVal: number) => {
    debugger
    updateValue(newVal);
    handleValidation(newVal)
  };

  const updateValue = (val: number) => {
    props.updateVal(val, props.formName);
    setValue(val);
  };

  const handleValidation = (val: any) => {
    let formIsValid = true;
    if (!val) {
      formIsValid = false;
      setError('Es necesario seleccionar una opción');
      return;
    }
    
    setError('');
  };

  return (
    <Fragment>
      <div className="radios">
        <div className="text mb-1">
          <span className="text__subTitle text__subTitle--gris-claro">
            {props.placeholder}
          </span>
        </div>

        {props.items.map((item: RadioItem, index: number) => (
          <div className="form__agreement" key={`${index}${item.desc}`}>
            <div className="agreement">
              <input
                className="agreement__radio"
                type="radio"
                name={props.formName}
                checked={value === item.val}
                onClick={(ev: any) => {
                  handleChange(item.val);
                }}
                onChange={() => {}}
                value={item.val}
              />
              <span className="agreement__label"></span>
            </div>
            <span className="text">
              <label className="text__agreement">{item.desc}</label>
            </span>
          </div>
        ))}
      </div>
      {error && <span className="txt-error">{error}</span>}
    </Fragment>
  );
};

export default RadioFormGroup;
