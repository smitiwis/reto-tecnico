const ButtonCustom = (props: { disabled: boolean, txt: string}) => {
  return (
    <button className="button__normal button__normal--azul">{props.txt}</button>
  );
};

export default ButtonCustom;
