import { useState, useEffect, Fragment } from "react";
import DatePicker, {registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
registerLocale('es', es)

const InputDate = (props: {updateVal: any, formName: string, placeholder: string, val: string, touched?: boolean}) => {
  let [focusedInput, setFocusedInput] =  useState(false);
  let [newDate, setNewDate] =  useState<any>('');
  let [error, setError] = useState<string>("")

  useEffect(() => {
    if (props.val) {
      updateValueFromStr(props.val)
    }
  }, [props.val])

  useEffect(() => {
    if (props.touched) {
      handleValidation(newDate)
    }
  }, [props.touched])

  const toggleLabel = (state: boolean) => {
    (document.querySelector('.react-datepicker-ignore-onclickoutside') as HTMLInputElement).readOnly  = true; 
    if (!newDate) {
      focusedInput = state;
    } 
    setFocusedInput(focusedInput);
  };

  const sanitizeDate = (date: Date): string => {
    return new Date(date).toISOString().replace('-', '/').split('T')[0].replace('-', '/');
  }

  const updateValueFromStr = (date: string) => {
    props.updateVal(date, props.formName);
    var newDate = new Date(date);
    setNewDate(newDate)
  }
  
  const updateValue = (date: string) => {
    handleValidation(date)
    var newDate = new Date(date);
    props.updateVal(sanitizeDate(newDate), props.formName);
    setNewDate(newDate);
  }

  const handleValidation = (val: any) => {
    let formIsValid = true;
    if (!val) {
      formIsValid = false;
      setError('El campo es obligatorio');
      return;
    }
    setError('');
  };


  return (
    <Fragment>
      <div className="form__item form__group"
        onClick={() => { toggleLabel(true) }}>
        <label className={"label label--estatic " + (newDate || focusedInput ? 'label--dynamic' : '') }>
          {props.placeholder}
        </label>
        {/* <span className="icon icon-calendario"></span> */}
        <DatePicker selected={newDate} onChange={(date: any) => updateValue(date)}  locale="es"/>
        
      {error && <span className="txt-error">{error}</span>}
      </div>
    </Fragment>
  )
}

export default InputDate;