import React, { Fragment, SyntheticEvent, useState } from "react";
// Componentes
import Migas from "../components/Migas";
import Presentacion from "../components/Presentacion";
import Saludo from "../components/Saludo";
import { IPlanUser, Item, Offer } from "../models/general";
import ButtonCustom from "../components/ButtonCustom";
import SelectForm from "../components/inputs/SelectForm";
import { useHistory } from "react-router-dom";

const Planes = () => {
  const defaultPlans: IPlanUser[] = [
    {
      id: 1,
      pack: "BÁSICO",
      img: "/images/ilustration1.png",
      price: "160",
      period: "mensual",
      state: true,
      cobertura: "Covertura mínima",
      saldo: "1MM",
      plan: "PLAN BÁSICO",
      offers: [
        { name: "Lima", description: "zona de cobertura1", state: false },
        {
          name: "+30 clinicas",
          description: "zona de cobertura2",
          state: true,
        },
        {
          name: "+20 exámenes",
          description: "zona de cobertura3",
          state: true,
        },
      ],
    },
    {
      id: 2,
      pack: "AVANZADO",
      img: "/images/ilustration2.png",
      price: "200",
      period: "mensual",
      state: false,
      cobertura: "Covertura baja",
      saldo: "2MM",
      plan: "PLAN AVANZADO",
      offers: [
        { name: "Huancayo", description: "zona de cobertura4", state: false },
        { name: "Chilca", description: "zona de cobertura5", state: true },
        { name: "Arequipa", description: "zona de cobertura6", state: false },
      ],
    },
    {
      id: 3,
      pack: "PREMIUM",
      img: "/images/ilustration1.png",
      price: "250",
      period: "mensual",
      state: false,
      cobertura: "Covertura alta",
      saldo: "3MM",
      plan: "PLAN PREMIUM",
      offers: [
        { name: "Piura", description: "zona sin cobertura7", state: true },
        { name: "Chiclayo", description: "zona sin cobertura8", state: false },
        { name: "Ica", description: "zona sin cobertura9", state: true },
      ],
    },
    {
      id: 4,
      pack: "FULL",
      img: "/images/ilustration2.png",
      price: "500",
      period: "mensual",
      state: false,
      cobertura: "Covertura máxima",
      saldo: "4MM",
      plan: "PLAN FULL",
      offers: [
        {
          name: "Madre de Dios",
          description: "zona de covertura",
          state: false,
        },
        { name: "Huanuco", description: "zona sin cobertura11", state: true },
        { name: "Loreto", description: "zona de cobertura12", state: true },
      ],
    },
  ];

  const itemServices: Item[] = [
    {val: '',  desc: 'Servicios brindados', state: false},
    {val: '1', desc: 'Opcion 1', state: true},
    {val: '2', desc: 'Opcion 2', state: true},
    {val: '3', desc: 'Opcion 3', state: true},
  ]
  const history = useHistory();
  let [plans, setPlans] = useState<IPlanUser[]>(defaultPlans);
  let [selected, setSelected] = useState<IPlanUser>(defaultPlans[0]);
  let [touched, setTouched] = useState<boolean>(false);
  let [form, setForm] = useState<any>();

  const updateStateCard = (id: number) => {
    const newPlans: IPlanUser[] = plans.map((plan: IPlanUser) => {
      let newState: boolean;

      if (plan.id === id) {
        newState = true;
        setSelected(plan);
      } else {
        newState = false;
      }

      const obectData = {
        ...plan,
        state: newState,
      };

      return obectData;
    });
    setPlans(newPlans);
  };

  const handleChange = (value: any, formName: any) => {
    const updatedForm: any = { ...form };
    updatedForm[formName] = value;
    setForm(updatedForm);
  };

  const waitFor = (delay: any) => new Promise(resolve => setTimeout(resolve, delay));

  const save = async (ev: SyntheticEvent)=> {
    ev.preventDefault();
    setTouched(true);
    await waitFor (500);
    debugger
    let existError = document.querySelector('.txt-error');
    if (!existError) {
      goToThanks();      
    } 
  }

  const goToThanks = () => {
    history.push("/gracias");
  }



  return (
    <Fragment>
      <Presentacion titulo={false} />

      <section className="plans">
        <div className="plans__container">
          <Migas activeStep={3} backRoute="/bienvenido" />
          <div className="plans__saludo">
            <Saludo
              titleGris="Elige, "
              titleBlue="tu proteccion"
              titleDescription="Selecione tu plan de salud ideal"
            />
          </div>
          <div className="plans__prices">
            <div className="prices">
              {plans.map((data: IPlanUser, index: number) => {
                const { id, pack, price, period, state } = data;
                return (
                  <div
                    className={
                      "card-price border border--gris " +
                      (state === true ? "actived" : "")
                    }
                    key={index}
                    onClick={() => {
                      updateStateCard(id);
                    }}
                  >
                    <div className="text">
                      <span className="text__price text__price--medium">
                        {pack}
                      </span>
                    </div>
                    <div className="text">
                      <span className="text__price text__price--large">
                        <span className="text__price text__price--small">
                          S/
                        </span>
                        {price}
                      </span>
                    </div>
                    <div className="text">
                      <span className="text__price text__price--medium">
                        {period}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="plans__results">
            <div className="card-results  border border--gris">
              <div className="card-results__titulo">
                <span className="card-results__titulo-text text__description--negro">
                  Cuentas con estos beneficios
                </span>
              </div>
              <div className="card-results__info">
                <div className="card-results__info-texto">
                  <div className="text">
                    <span className="text__price text__price--medium">
                      {selected.cobertura}
                    </span>
                  </div>
                  <div className="text">
                    <span className="text__price text__price--large">
                      S/{selected.saldo}
                    </span>
                  </div>
                  <div className="toltip">
                    <span className="toltip--verde">{selected.plan}</span>
                  </div>
                </div>
                <div className="card-results__info-figure">
                  <img className="img" src={selected.img} alt="" />
                </div>
              </div>

              <div className="card-results__list">
                <div className="card-results__list-items">
                  {selected.offers.map((promo: Offer, index: number) => {
                    if (promo.state) {
                      return (
                        <div className="item-results" key={index}>
                          <span className="icon icon-corazon"></span>
                          <span className="text">
                            <span className="text__description--list">
                              {promo.name}{" "}
                            </span>
                            <span className="text__description--list-desc font-bold">
                              {" "}
                              ({promo.description})
                            </span>
                          </span>
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="card-results__list-items">
                  {selected.offers.map((promo: Offer, index: number) => {
                    if (!promo.state) {
                      return (
                        <div className="item-results" key={index}>
                          <div className="text tachado">
                            <span className="icon icon-corazon"></span>
                            <span className="text__description--gris-tachado">
                              {promo.description}
                            </span>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="plans__titulo">
            <div className="text">
              <h1 className="text__subTitle text__subTitle--gris m-0">
                {" "}
                Revisa nuestros <br />
                <span className="text__subTitle text__subTitle--azul">
                  {" "}
                  servicios y exclusiones
                </span>
              </h1>
            </div>
          </div>
          <form action="" onSubmit={(ev: SyntheticEvent) => {save(ev)}}>
            <div className="plans__acoordeon">
              <SelectForm touched={touched} updateVal={handleChange} formName="services" placeholder="Servicios brindados" items={itemServices} val=""/>
              <SelectForm touched={touched} updateVal={handleChange} formName="excludes" placeholder="Exclusiones" items={itemServices} val=""/>
            </div>
            {/* <div className="plans__acoordeon">
              <div className="content-select">
                <span className="icon icon-abajo"></span>
                <select className="select">
                  <option value="">Servicios brindados</option>
                  <option value="opcion-1">Opción 1</option>
                  <option value="opcion-2">Opción 2</option>
                  <option value="opcion-x">Opción X</option>
                </select>
              </div>
            </div> */}
            <br/><br/>
            <div className="plans__button ">
              <div className="button">
                <button className="button__normal button__normal--transparente">
                  ENVIAR COTIZACIÓN POR CORREO
                </button>
              </div>
              <div className="button">
                <ButtonCustom txt="Comprar Plan" disabled={false} />
              </div>
            </div>
          </form>
        </div>
      </section>
    </Fragment>
  );
};

export default Planes;
