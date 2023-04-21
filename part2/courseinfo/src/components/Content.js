import Part from "./Part";

const Total = ({ parts }) => {
  // let total = parts[0].exercises + parts[1].exercises + parts[2].exercises;

  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return <h4>total of {total} exercises</h4>;
};

const Content = ({ parts }) => {

  return (
    <div>
      { 
        parts.map(part => (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))
      }
      <Total parts={parts} />
    </div>
  );

};

export default Content;