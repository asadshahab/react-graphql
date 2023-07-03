
import {useCustomer} from "../hooks/useCustomer";


export default function Customers() {

    const { loading, error, data } = useCustomer() || {};
    console.log(data, "data", error, "error");

  if (loading) return <p>Loading...</p>;
  if (error) return <p> Something went wrong</p>;

  return (
    <div>
      <h1>Customers</h1> 
      {/* <ul>
        {data.characters.results.map((character) => (
          <li key={character.id}>
            <img src={character.image} alt={character.name} />
            {character.name}
          </li>
        ))}
      </ul> */}
    </div>
  );
}
