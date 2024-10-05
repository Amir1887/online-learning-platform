import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useCoursesCategories } from '../context/AllCoursesContext';

function HomePage() {
  const { courses, categories, isLoading, error } = useCoursesCategories();
  console.log("all categories front:", categories);
  console.log("all courses front:", courses);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col items-center justify-center mt-4 text-primary-dark">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Online Learning Platform</h1>
      <Header />
      
      <div className="mt-8 w-full px-4 md:px-12 lg:px-24">
      <h2 className="text-3xl font-bold mb-6 ">Our Available Courses:</h2>
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Courses In {category.name}</h2>

              {courses && courses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
                  {courses.map((course) => (
                    course.categoryId === category.id && (
                      <Link 
                        to={`/dashboard/course/${course.id}`} 
                        key={course.id} 
                        className="block"
                      >
                        <div className="border rounded-lg shadow-lg overflow-hidden bg-gray-50 hover:shadow-xl transition-shadow duration-300">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-4">
                            <h3 className="text-xl font-semibold">{course.title}</h3>
                            <p className="mt-2 text-gray-600">{course.description}</p>
                            <p className="mt-2 text-sm text-gray-500">Created on: {new Date(course.createdAt).toLocaleDateString()}</p>
                            <p className="mt-1 text-sm text-gray-500">Last Updated on: {new Date(course.updatedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </Link>
                    )
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No courses available in this category.</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No categories available.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
