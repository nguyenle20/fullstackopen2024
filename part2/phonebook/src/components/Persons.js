const Persons = ({ searchPerson, onClick, persons }) => {


    //display searchPerson if it existed
    if(searchPerson) {
        return searchPerson?.map(person =>
           <div key={person.id}>
            <p>
                {person.name} {person.number} {" "}
                <button onClick={() => onClick(person)}>delete</button>
            </p>

           </div>
        )
    } else
        return persons.map(person =>
            <div key={person.id}>
                <p>
                    {person.name} {person.number} {" "}
                    <button onClick={() => onClick(person)}>delete</button>
                </p>
            </div>
        )


};

export default Persons;