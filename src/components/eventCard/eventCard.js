import "./eventCard.css";
// https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952
export default function Searchbar(props) {
  return (
    <div className="container">
      <div className="card">
        <div className="imgBx">
          <img src={props.img} />
        </div>
        <div className="contentBx">
          <h2>Ariana Grande</h2>
          <div className="date">
            <h3>Date : </h3>
            <span>{props.date}</span>
          </div>
          <div className="location">
            <h3>Location :</h3>
            <span>{props.location}</span>
          </div>
          <a href="#">Join Now</a>
        </div>
      </div>
    </div>
  );
}
