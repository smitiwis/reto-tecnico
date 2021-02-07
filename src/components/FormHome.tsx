import React, { SyntheticEvent, useState } from "react";
import { UserBasic } from "../models/general";
import CheckboxForm from "./inputs/CheckboxForm";
import InputDate from "./inputs/InputDate";
import InputForm from "./inputs/InputForm";
import InputSelect from "./inputs/InputSelect";
import { useHistory } from "react-router-dom";
import ButtonCustom from "./ButtonCustom";
import { UserService } from "../services/UserService";
import { StorageService } from "../services/StorageService";

const FormHome = () => {
  const defaultValues: UserBasic = {
    documentType: 1,
    document: '',
    phone: null,
    conditions: false,
    comunications: false,
    birthdate: ''
  }


  let [form, setForm] = useState<UserBasic>(defaultValues);
  let [touched, setTouched] = useState<boolean>(false);
  // let [isFormValid, setIsFormValid] = useState<boolean>(false);
  const history = useHistory();

  const handleChange = (value: any, formName: any): void => {
    const updatedForm: any = { ...form };
    updatedForm[formName] = value;
    setForm(updatedForm);
    
  }

  const waitFor = (delay: any) => new Promise(resolve => setTimeout(resolve, delay));
  
  const saveForm =  async (ev: SyntheticEvent) => {
    ev.preventDefault();
    setTouched(true);
    await waitFor (500);
    let existError = document.querySelector('.txt-error');
    if (!existError) {
      const userService = new UserService();
      const storageService = new StorageService();
      userService.getUserInfo()
        .then(({data}) => {
          const {results} = data;
          const [userInfo] = results;
          storageService.setItemObject('userInfo', {...userInfo, documentType: form.documentType, document: form.document, birthdate: form.birthdate})
          goToWelcomeView()
        })
    }
  }

  const goToWelcomeView = () => {
    history.push("/bienvenido");
  }

  return (
    <section className="form-section">
      <div className="text">
        <h1 className="text__title text__title--gris m-0"> Obtén tu
            <span className="text__title text__title--azul"> Seguro ahora</span>
        </h1>
      </div>
      <div className="text">
        <h2 className="text__subTitle text__subTitle--gris-claro">
          Ingresa los datos para comenzar.
          </h2>
      </div>
      <form className="form" action="form" onSubmit={(ev) => { saveForm(ev) }}>
        <div className="form__container">
          <InputSelect updateVal={handleChange} 
            formNameInput="document" 
            formNameSelect="documentType" 
            placeholder={'Nro. de documento'} 
            type="number" 
            touched={touched}
            valSelect={form.documentType} 
            valInput="" />
          <InputDate updateVal={handleChange}
            formName="birthdate"
            placeholder={'Fecha de Nacimiento'}
            touched={touched}
            val=''/>
          <InputForm updateVal={handleChange}
            formName="phone"
            touched={touched}
            maxlength={9}
            minlength={9}
            placeholder={'Celular'}
            type="number"
            val='' />
          <CheckboxForm updateVal={handleChange}
            formName="conditions"
            touched={touched}
            placeholder={'Política de Protección de Datos Personales y los Términos de Condiciones.'}
            val={false} />
          <CheckboxForm updateVal={handleChange}
            touched={touched}
            formName="comunications"
            placeholder={'Política de Envío de Comunicaciones Comerciales.'}
            val={false} />

          <div className="button">
              <ButtonCustom txt="COMENCEMOS" disabled={false}/>
          </div>

        </div>
      </form>
    </section>
  )
}

export default FormHome;