import Pet from "../pet/Pet";
import "./posts.scss";

const Pets = ({ pets }) => {
  return <div className="posts">
    {pets.map(pet => (
      <Pet pet={pet} key={pet.id} />
    ))}
  </div>;
};

export default Pets;
