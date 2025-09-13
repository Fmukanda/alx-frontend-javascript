// Teacher interface with specific requirements
interface Teacher {
  // These attributes should only be modifiable when Teacher is first initialized
  readonly firstName: string;
  readonly lastName: string;
  
  // This attribute should always be defined
  fullTimeEmployee: boolean;
  
  // This attribute is optional
  yearsOfExperience?: number;
  
  // This attribute should always be defined
  location: string;
  
  // Index signature - allows adding any additional attributes without specifying names
  [key: string]: any;
}

// Example usage and demonstrations
function demonstrateTeacherInterface(): void {
  // Create a teacher with required properties
  const teacher1: Teacher = {
    firstName: 'John',
    lastName: 'Smith',
    fullTimeEmployee: true,
    location: 'New York',
    yearsOfExperience: 5, // optional property
    contract: true // additional attribute using index signature
  };

  // Create another teacher without optional property but with additional attributes
  const teacher2: Teacher = {
    firstName: 'Jane',
    lastName: 'Doe',
    fullTimeEmployee: false,
    location: 'California',
    // yearsOfExperience is optional, so we can omit it
    contract: false, // additional attribute
    department: 'Mathematics', // another additional attribute
    salary: 50000 // yet another additional attribute
  };

  // Create a teacher with multiple additional attributes
  const teacher3: Teacher = {
    firstName: 'Robert',
    lastName: 'Johnson',
    fullTimeEmployee: true,
    location: 'Texas',
    yearsOfExperience: 10,
    contract: true,
    department: 'Science',
    hasPhD: true,
    courses: ['Biology', 'Chemistry'],
    officeNumber: '204B'
  };

  console.log('Teacher 1:', teacher1);
  console.log('Teacher 2:', teacher2);
  console.log('Teacher 3:', teacher3);

  // Demonstrate that firstName and lastName are readonly
  console.log('\n--- Demonstrating readonly properties ---');
  console.log(`Teacher1 firstName: ${teacher1.firstName}`);
  console.log(`Teacher1 lastName: ${teacher1.lastName}`);
  
  // The following would cause TypeScript compilation errors:
  // teacher1.firstName = 'NewName'; // Error: Cannot assign to 'firstName' because it is a read-only property
  // teacher1.lastName = 'NewLastName'; // Error: Cannot assign to 'lastName' because it is a read-only property

  // But we can modify other properties
  teacher1.fullTimeEmployee = false;
  teacher1.location = 'Boston';
  teacher1.yearsOfExperience = 7;
  teacher1.contract = false; // Can modify additional attributes
  teacher1.newAttribute = 'This is dynamically added'; // Can add new attributes

  console.log('Modified Teacher 1:', teacher1);

  // Demonstrate accessing additional attributes
  console.log('\n--- Accessing additional attributes ---');
  console.log(`Teacher2 contract: ${teacher2.contract}`);
  console.log(`Teacher2 department: ${teacher2.department}`);
  console.log(`Teacher3 hasPhD: ${teacher3.hasPhD}`);
  console.log(`Teacher3 courses: ${teacher3.courses}`);
}

// Function to create a teacher with validation
function createTeacher(
  firstName: string,
  lastName: string,
  fullTimeEmployee: boolean,
  location: string,
  yearsOfExperience?: number,
  additionalAttributes?: { [key: string]: any }
): Teacher {
  const teacher: Teacher = {
    firstName,
    lastName,
    fullTimeEmployee,
    location
  };

  // Add optional yearsOfExperience if provided
  if (yearsOfExperience !== undefined) {
    teacher.yearsOfExperience = yearsOfExperience;
  }

  // Add any additional attributes
  if (additionalAttributes) {
    Object.keys(additionalAttributes).forEach(key => {
      teacher[key] = additionalAttributes[key];
    });
  }

  return teacher;
}

// Example usage of the factory function
function demonstrateTeacherFactory(): void {
  console.log('\n--- Using Teacher Factory Function ---');
  
  const newTeacher1 = createTeacher(
    'Alice',
    'Brown',
    true,
    'Florida',
    8,
    {
      contract: true,
      department: 'English',
      hasPhD: true,
      specialization: 'Literature'
    }
  );

  const newTeacher2 = createTeacher(
    'Bob',
    'Wilson',
    false,
    'Oregon',
    undefined, // no years of experience
    {
      contract: false,
      isSubstitute: true,
      availableDays: ['Monday', 'Wednesday', 'Friday']
    }
  );

  console.log('New Teacher 1:', newTeacher1);
  console.log('New Teacher 2:', newTeacher2);
}

// Function to display teacher information in a formatted way
function displayTeacherInfo(teacher: Teacher): void {
  console.log('\n--- Teacher Information ---');
  console.log(`Name: ${teacher.firstName} ${teacher.lastName}`);
  console.log(`Full-time Employee: ${teacher.fullTimeEmployee}`);
  console.log(`Location: ${teacher.location}`);
  
  if (teacher.yearsOfExperience !== undefined) {
    console.log(`Years of Experience: ${teacher.yearsOfExperience}`);
  } else {
    console.log('Years of Experience: Not specified');
  }

  // Display additional attributes
  const standardKeys = ['firstName', 'lastName', 'fullTimeEmployee', 'location', 'yearsOfExperience'];
  const additionalKeys = Object.keys(teacher).filter(key => !standardKeys.includes(key));
  
  if (additionalKeys.length > 0) {
    console.log('Additional Attributes:');
    additionalKeys.forEach(key => {
      console.log(`  ${key}: ${JSON.stringify(teacher[key])}`);
    });
  }
}

// Run demonstrations
demonstrateTeacherInterface();
demonstrateTeacherFactory();

// Example of displaying teacher info
const exampleTeacher: Teacher = {
  firstName: 'Sarah',
  lastName: 'Davis',
  fullTimeEmployee: true,
  location: 'Washington',
  yearsOfExperience: 12,
  contract: true,
  department: 'Physics',
  hasPhD: true,
  researchArea: 'Quantum Mechanics',
  publications: 15
};

displayTeacherInfo(exampleTeacher);

// Export the interface and utility functions
export { Teacher, createTeacher, displayTeacherInfo };
