import React from 'react';

const Blog = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 max-w-[1488px] justify-items-center gap-y-10'>
            <div className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
                <div>
                    <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white"> What are the different ways to manage a state in a React application?</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">the state in the parent component. Often, the same state is used across multiple components. In those cases, it is useful to lift the state to a common parent. The lifting state is a two‑step process. First, we declare the state in a common parent component, and then we pass the state down to child components via props. This pattern should be considered any time a few related components need to use the same state. The lifting state avoids duplicating states in multiple components. It helps to assure that our components all consistently reflect the same state.</p>
                </div>
            </div>
            <div className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
                <div>
                    <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">How does prototypical inheritance work?</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the Prototype of an object, we use Object. getPrototypeOf and Object.</p>
                </div>
            </div>
            <div className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
                <div>
                    <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">What is a unit test? Why should we write unit tests?</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
                </div>
            </div>
            <div className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
                <div>
                    <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">React vs. Angular vs. Vue?</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option</p>
                </div>
            </div>
        </div>
    );
};

export default Blog;