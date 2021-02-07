import React, { Fragment, SyntheticEvent, useEffect, useState } from "react";
// Componentes
import { RadioItem, User } from "../models/general";
import InputSelect from "../components/inputs/InputSelect";
import Migas from "../components/Migas";
import Presentacion from "../components/Presentacion";
import Saludo from "../components/Saludo";
import InputForm from "../components/inputs/InputForm";
import InputDate from "../components/inputs/InputDate";
import RadioFormGroup from "../components/inputs/RadioFormGroup";
import ButtonCustom from "../components/ButtonCustom";
import { StorageService } from "../services/StorageService";
import { useHistory } from "react-router-dom";

const Welcome = () => {
  const defaultValues: User = {
    documentType: 1,
    document: '',
    secureFor: 1,
    gender: 1,
    birthdate: "",
    name: "",
    fatherLastname: "",
    motherLastname: "",
  };

  const storageService = new StorageService();
  const history = useHistory();
  let [touched, setTouched] = useState<boolean>(false);
  let [form, setForm] = useState<User>(defaultValues);


  useEffect(() => {
    const user = storageService.getItemObject("userInfo") as any;
    const updateInfo: User = {
      ...form,
      document: user.document,
      documentType: user.documentType,
      name: user.name.first,
      fatherLastname: user.name.last,
      motherLastname: user.name.title,
      birthdate: user.birthdate,
      gender: user.gender === "female" ? 2 : 1,
    };

    setForm(updateInfo);
  }, []);

  const genderItems: RadioItem[] = [
    { val: 1, desc: "Masculino" },
    { val: 2, desc: "Femenino" },
  ];

  const secureItems: RadioItem[] = [
    { val: 1, desc: "Solo a mi" },
    { val: 2, desc: "A mi y a mi familia" },
  ];

  const handleChange = (value: any, formName: any) => {
    const updatedForm: any = { ...form };
    updatedForm[formName] = value;
    setForm(updatedForm);
  };

  const waitFor = (delay: any) => new Promise(resolve => setTimeout(resolve, delay));

  const save = async (ev: SyntheticEvent) => {
    ev.preventDefault();
    setTouched(true);
    await waitFor (500);
    let existError = document.querySelector('.txt-error');
    if (!existError) {
      goToPlans();      
    } 
  }

  const goToPlans = () => {
    history.push("/planes");
  }

  return (
    <Fragment>
      <Presentacion titulo={false} />
      <section className="">
        <Migas activeStep={2} backRoute=''/>
        <Saludo
          titleGris="Hola, "
          titleBlue={form.name}
          titleDescription="Validar que los datos sean correctos"
        />

        <div className="text">
          <h2 className="text__subTitle text__subTitle--gris-claro mt-2">
            Datos personales del titular
          </h2>
        </div>

        <form className="form" onSubmit={(ev: SyntheticEvent) => {save(ev)}}>
          <div className="form__container">
            <InputSelect
              updateVal={handleChange}
              formNameInput="document"
              formNameSelect="documentType"
              placeholder={"Nro. de documento"}
              type="number"
              valSelect={form.documentType}
              valInput={form.document}
              touched={touched}
            />
            <InputForm
              updateVal={handleChange}
              formName="name"
              placeholder={"Nombres"}
              maxlength={50}
              type="text"
              touched={touched}
              val={form.name}
            />
            <InputForm
              updateVal={handleChange}
              formName="fatherLastname"
              placeholder={"Apellido Paterno"}
              type="text"
              maxlength={50}
              touched={touched}
              val={form.fatherLastname}
            />
            <InputForm
              updateVal={handleChange}
              formName="motherLastname"
              placeholder={"Apellido Materno"}
              type="text"
              maxlength={50}
              touched={touched}
              val={form.motherLastname}
            />
            <InputDate
              updateVal={handleChange}
              formName="birthdate"
              placeholder={"Fecha de Nacimiento"}
              touched={touched}
              val={form.birthdate}
            />
            <RadioFormGroup
              formName="gender"
              placeholder={"Género"}
              updateVal={handleChange}
              items={genderItems}
              touched={touched}
              val={form.gender}
            />
            <RadioFormGroup
              formName="secureFor"
              placeholder={"A quien va a asegurar"}
              updateVal={handleChange}
              touched={touched}
              items={secureItems}
              val={0}
            />
            <div className="button">
              <ButtonCustom txt="Continuar" disabled={false} />
            </div>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default Welcome;
