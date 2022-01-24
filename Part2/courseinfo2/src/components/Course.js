import React from 'react';

const Course = ({courses}) => {
    console.log(courses);
    return(
    <div>
      {courses.map((item) => {
        console.log(item);
        return <>
        <Header course={item}/>
        <Content course={item} />
        <Total course={item} />
        </>
      })}
    </div>
    )
  }
  
  const Header = (props) => {
    return(
      <h1>{props.course.name}</h1>
      )
    }
  
    const Content = ({course}) => {
      console.log(course.parts);
      return(
        <>
        {course.parts.map((item) => <Part key={item.id} part={item}/>)}
        </>
    )
  }
  
  const Total = ({course}) => {
    let sum = course.parts.reduce((s, p) => {return s + p.exercises}, 0)
    return(
      <p>total of {sum} exercises</p>
      )
  }
  
    const Part = (props) => {
      console.log("Part: ", props);
      return(
        <>
        <p>{props.part.name} {props.part.exercises}</p>
      </>
    )
  }

export default Course;
