import { useEffect, useState } from 'react';
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import noteServices from "./services/phoneBookServices";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newPerson, setNewPerson] = useState({
        name: "",
        number: "",
    });
    const [searchPerson, setSearchPerson] = useState();
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [notificationType, setNotificationType] = useState('');

    useEffect(() => {

        noteServices.getAllPersons()
            .then(initialPerson => setPersons(initialPerson))
            .catch(error => console.log(error));

    },[]);

    const showNotification = (message, type = 'success') => {
        setNotificationMessage(message);
        setNotificationType(type);
        // setTimeout(() => setNotificationMessage(null));
    }

    const addPhone = (e) => {
        e.preventDefault();

        //handle duplicate name
        const duplicatePerson = persons.find(person => person.name === newPerson.name);
        if(duplicatePerson !== undefined) {
            if(duplicatePerson.number === newPerson.number) {
                return alert(`${duplicatePerson.name} is already added to phonebook`);
            } else if (
                window.confirm(`${duplicatePerson.name} is already added to phonebook, replace the old number with the new one?`)
            ) {
                noteServices.updatePersonsByID(duplicatePerson.id, {
                    ...duplicatePerson,
                    number: newPerson.number
                }).then((updatedPerson) => {
                    setPersons(
                        persons.map(person =>
                            person.id !== updatedPerson.id ? person : updatedPerson
                        )
                    );
                    // alert(`${newPerson.name} updated`);
                    showNotification(`Updated ${newPerson.name}`);
                }).catch(() => {
                    setPersons(
                        persons.filter(person => person.id !== duplicatePerson.id)
                    );
                    showNotification(`Failed to update ${duplicatePerson.name}`, 'error');
                })
            }
        }

        //if not duplicate add to phone book
        else {
            const newPersonData = {
                name: newPerson.name,
                number: newPerson.number,
                id: persons.length + 1,
            }
            noteServices.createNewPersons(newPersonData)
                .then( returnedPerson => {
                    setPersons(persons.concat(returnedPerson));
                    //reset input
                    setNewPerson({
                        name: "",
                        number: "",
                    });
                    showNotification(`Added ${returnedPerson.name}`);
                });
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setNewPerson({
            ...newPerson,
            [e.target.name]: value,
        });
    };

    const handleFilterChange = (e) => {
        const regex = new RegExp(`${e.target.value}`, 'i' );
        let result;

        if(/\s/g.test(e.target.value)) {
            console.log('name not in phonebook');
        } else {
            result = persons.filter(({name}) => regex.test(name));
        }

        setSearchPerson(result.length > 0 ? result : undefined);
    }

    const handleDeleteById = (person) => {

        if(window.confirm(`Delete ${person.name}`)) {
            noteServices.deletePersonById(person.id)
                .then(() =>
                    setPersons(
                        persons.filter(statePerson => statePerson.id !== person.id)
                    )
                )
                .catch(() => {
                    showNotification(`Information of ${person.name} has already been removed from server`, 'error');
                })
        }
    };


    return (
        <div>
            <h2>Phonebook</h2>
            {/*handle display error*/}
            <Notification message={notificationMessage} type={notificationType}/>
            <Filter onChange={handleFilterChange}/>
            <h2>add a new</h2>
            <PersonForm
                onSubmit={addPhone}
                onChange={handlePhoneChange}
                value={newPerson}
            />
            <h2>Numbers</h2>
            <Persons searchPerson={searchPerson} persons={persons} onClick={handleDeleteById} />
        </div>
    )
};

export default App;