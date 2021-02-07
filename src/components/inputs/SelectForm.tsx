import React, { Fragment, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Item } from "../../models/general";

const SelectForm = (props: {
  updateVal: any;
  formName: string;
  items: Item[];
  placeholder: string;
  val: string;
  touched: boolean;
}) => {
  let [value, setValue] = useState<string>("");
  let [error, setError] = useState<string>("");

  useEffect(() => {
    updateValue(props.val);
  }, [props.val]);

  useEffect(() => {
    if (props.touched) {
      handleValidation(value);
    }
  }, [props.touched]);

  const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const newVal: string = event.currentTarget.value;
    updateValue(newVal);
    handleValidation(newVal);
  };

  const updateValue = (val: string) => {
    props.updateVal(val, props.formName);
    setValue(val);
  };

  const handleValidation = (val: any) => {
    if (!val) {
      setError("Es necesario seleccionar una opción");
      return;
    }

    setError("");
  };

  return (
    <Fragment>
      <div className="content-select">
        <span className="icon icon-abajo"></span>
        <select
          className="select"
          placeholder={props.placeholder}
          onChange={(ev: React.FormEvent<HTMLSelectElement>) => {
            handleChange(ev);
          }}
        >
          {props.items.map((item: Item, index: number) => (
            <option
              value={item.val}
              key={index}
              disabled={!item.state}
              selected={!item.state}
            >
              {item.desc}
            </option>
          ))}
        </select>
      </div>
      {error && <span className="txt-error">{error}</span>}
    </Fragment>
  );
};

export default SelectForm;
