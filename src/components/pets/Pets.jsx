import Pet from "../pet/Pet";
import "./pets.scss";

const Pets = ({ pets }) => {
  console.log("pett petts"+pets);
  return <div className="posts">
    {pets.map(pet => (
      <Pet pet={pet} key={pet.id} />
    ))}
  </div>;
 
};

export default Pets;
