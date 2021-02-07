const Presentacion = (props: { titulo: boolean }) => {
  return (
    <section className={(props.titulo === false) ? 'navegando' : 'presentation'} >
      {
        (props.titulo === false)
          ? <div className="navegando__gracias"></div>
          : <div className="presentation__text">
            <div className="text">
              <h1 className="text__title text__title--general"> Seguro de <br />
                <span className="text__title--negrita text__title--general"> Salud</span>
              </h1>
              <p className="text__description text__description--blanco">
                <span className="icon icon-seguro"></span>
                Cómpralo de manera fácil y rápida
              </p>
              <p className="text__description text__description--blanco">
                <span className="icon icon-cita"></span>
                Cotiza y compra tu seguro 100% digital
              </p>
              <p className="text__description text__description--blanco">
                <span className="icon icon-dinero"></span>
                Hasta S/.12 millones de cobertura anual
              </p>
              <p className="text__description text__description--blanco">
                <span className="icon icon-mas"></span>
                Más de 300 clínicas en todo el Perú
              </p>
            </div>
            <div className="text">
              <span className="text__description text__description--blanco">
                ©2021 RIMAC Seguros y Reasegurados
              </span>
            </div>
          </div>
      }
    </section>


  )
}

export default Presentacion;