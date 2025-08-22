import "./card.css";
const Card = ({ children, icon }) => {
  return (
    <div className="card">
      <span className="border top"></span>
      <span className="border right"></span>
      <span className="border bottom"></span>
      <span className="border left"></span>
      {icon && <div className="icon">{icon}</div>}
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
