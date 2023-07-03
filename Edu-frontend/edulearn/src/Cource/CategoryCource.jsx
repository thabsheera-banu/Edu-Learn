import React from 'react';

function CategoryCourse() {
  // Assuming you have a course object
  const course = {
    id: 1,
    title: 'Course 1',
    image: 'https://example.com/course1.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  };

  return (
    <div className="sidebar-card">
      <img src={course.image} alt={course.title} />
      <div className="card-content">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
      </div>
      <a href={`/courses/${course.id}`}>View Details</a>
    </div>
  );
}

export default CategoryCourse;
