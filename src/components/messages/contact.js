export default function contact(props) {
  return (
    <div className="container">
      <img src={props.img} />
      <h1 className="name">{props.name}</h1>
    </div>
  );
}
