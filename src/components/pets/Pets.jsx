import { useEffect } from "react";
import Pet from "../pet/Pet";
import "./pets.scss";

<<<<<<< HEAD
const Pets = ({ pets,setPets }) => {
  console.log("pett petts"+pets);
  return <div className="posts">
    {pets.map(pet => (
      // <Pet pet={pet} key={pet.id} />
      <Pet setPets={setPets} pet={pet} key={pet.id} pets={pets}/>
    ))}
  </div>;
 
=======
const Pets = ({ pets }) => {
  // useEffect(() => {
  //   console.log("pett petts" + pets);
  // }, []);
  return (
    <div className="posts">
      {pets.map((pet) => (
        <Pet pet={pet} key={pet.id} />
      ))}
    </div>
  );
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
};

export default Pets;
