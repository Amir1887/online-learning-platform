import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import algoliasearch from 'algoliasearch'; // this is the version in which saveObjects method work.. 


import { InstantSearch, SearchBox, Hits, Highlight, connectStateResults  } from 'react-instantsearch-dom';


const appID = "LBK71E9PXR";

const apiKey = "91a12ffce3757bc4e05acc55bf0fbcab";


const searchClient = algoliasearch(appID, apiKey);



// Initialize the Algolia index
const index = searchClient.initIndex('proud_AMIR');
// console.log("here is the index..",index)


// Function to upload data to Algolia from backend API
const uploadDataToAlgolia = async () => {
  try {
   // Fetch courses from your backend
   const res = await axios.get('http://localhost:4000/courses');
   const courses = res.data;
  //  console.log("here is the courses ",courses)


    // Map data to match Algolia's format (ensure each course has an `objectID`)
    const formattedCourses = courses.map(course => ({
      objectID: course.id,  // Algolia requires a unique `objectID`
      title: course.title,
      description: course.description,
    }));

    // console.log("formatted courses ..", formattedCourses);

    // Upload the formatted data to Algolia 
    const algoliaResponse = await index.saveObjects(formattedCourses, { autoGenerateObjectIDIfNotExist: true });

    // console.log("after uploading", algoliaResponse);

    console.log('Courses successfully uploaded to Algolia:', algoliaResponse);
  } catch (error) {
    console.error('Error uploading data to Algolia:', error);
  }
};

const CoursesPage = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories from the backend
  useEffect(() => {
    axios.get('http://localhost:4000/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch courses when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      axios.get(`http://localhost:4000/courses?category=${selectedCategory.id}`)
        .then(res => setCourses(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedCategory]);

  // Upload data to Algolia when the component mount 
  useEffect(() => {
    uploadDataToAlgolia();
  }, []);
  
  // Component to render search results
  const CourseHit = ({ hit }) => (
    <div className="p-4 border rounded">
      <h3 className="text-xl">
        <Highlight attribute="title" hit={hit} />
      </h3>
      <p className="text-gray-600">
        <Highlight attribute="description" hit={hit} />
      </p>
      <Link to={`/course/${hit.objectID}`} className="text-blue-500 mt-2 block">More Info</Link>
    </div>
  );

// Modify the SearchCourses component to hide results until search query exists
const SearchCourses = () => (
  <div className="w-full max-w-4xl mx-auto">
    <InstantSearch searchClient={searchClient} indexName="proud_AMIR">
      <SearchBox translations={{ placeholder: 'Search for courses...' }} />
      <CustomHits />
    </InstantSearch>
  </div>
);

// Conditionally render Hits if search query exists
const CustomHits = connectStateResults(({ searchState, searchResults }) => {
  const hasResults = searchResults && searchResults.nbHits !== 0;
  const hasQuery = searchState && searchState.query;

  return hasQuery && hasResults ? <Hits hitComponent={CourseHit} /> : null;
});

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl mb-6">Courses</h1>

      {/* Search bar with Algolia */}
      <SearchCourses />

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
