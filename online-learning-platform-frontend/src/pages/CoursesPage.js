import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const CoursesPage = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories
  useEffect(() => {
    axios.get('http://localhost:4000/categories') // Adjust the URL as needed
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch courses when category is selected
  useEffect(() => {
    if (selectedCategory) {
      axios.get(`http://localhost:4000/courses?category=${selectedCategory.id}`)
        .then(res => setCourses(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedCategory]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl mb-6">Courses</h1>

      {/* Categories */}
      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map(category => (
          <button 
            key={category.id}
            onClick={() => setSelectedCategory(category)}
            className={`p-2 border rounded ${selectedCategory?.id === category.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Courses */}
      {selectedCategory && (
        <div className="w-full max-w-7xl p-8">
          <h2 className="text-2xl mb-4 text-center">Courses in {selectedCategory.name}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map(course => (
              <Link key={course.id} to={`/course/${course.id}`} className="p-4 border rounded">
                <h3 className="text-xl">{course.title}</h3>
                <p className="text-gray-600">{course.description}</p>
                <p className="text-blue-500 mt-2">More Info</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
