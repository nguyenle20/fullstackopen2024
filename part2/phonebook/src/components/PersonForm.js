
const PersonForm = ({ onSubmit, onChange, value }) => {
    const { name, number } = value;

    return (
        <form onSubmit={onSubmit} >
            <div>
                name: <input onChange={onChange} value={name} name="name" />
            </div>
            <div>
                number: <input onChange={onChange} value={number} name="number" />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default PersonForm;