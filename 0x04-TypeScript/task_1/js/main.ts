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

// Interface for Directors that extends Teacher
interface Director extends Teacher {
  numberOfReports: number;
}

// Interface for the printTeacher function
interface printTeacherFunction {
  (firstName: string, lastName: string): string;
}

// Implementation of the printTeacher function
const printTeacher: printTeacherFunction = (firstName: string, lastName: string): string => {
  if (!firstName || !lastName) {
    throw new Error('Both firstName and lastName are required');
  }
  
  const firstInitial = firstName.charAt(0).toUpperCase();
  return `${firstInitial}. ${lastName}`;
};

// Using the function
// printTeacher(firstName,lastName) -> return ${firstName,lastName}
export function demonstratePrintTeacher(): void {
  console.log(`printTeacher("John", "Doe") -> ${printTeacher("John", "Doe")}`);
}


// Interface for the StudentClass constructor
interface StudentConstructor {
  new (firstName: string, lastName: string): StudentClassInterface;
}

// Interface for the StudentClass instance methods
interface StudentClassInterface {
  workOnHomework(): string;
  displayName(): string;
}

// class StudentClass { }
// Implementation of the StudentClass
class StudentClass implements StudentClassInterface {
  private firstName: string;
  private lastName: string;

  // Constructor
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // Method implementations
  workOnHomework(): string {
    return 'Currently working';
  }

  displayName(): string {
    return this.firstName;
  }

  // Optional: Getter methods for encapsulation
  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  // Optional: Setter methods with validation
  setFirstName(firstName: string): void {
    if (firstName && firstName.trim().length > 0) {
      this.firstName = firstName.trim();
    }
  }

  setLastName(lastName: string): void {
    if (lastName && lastName.trim().length > 0) {
      this.lastName = lastName.trim();
    }
  }
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

// Complete demonstration of the Teacher interface
import { Teacher, createTeacher, displayTeacherInfo } from './teacher';

// Example 1: Basic teacher with all required properties
const basicTeacher: Teacher = {
  firstName: 'John',
  lastName: 'Smith',
  fullTimeEmployee: true,
  location: 'Boston'
};

// Example 2: Teacher with optional yearsOfExperience
const experiencedTeacher: Teacher = {
  firstName: 'Maria',
  lastName: 'Garcia',
  fullTimeEmployee: true,
  location: 'Miami',
  yearsOfExperience: 15
};

// Example 3: Teacher with multiple additional attributes
const detailedTeacher: Teacher = {
  firstName: 'David',
  lastName: 'Chen',
  fullTimeEmployee: false,
  location: 'Seattle',
  yearsOfExperience: 3,
  // Additional attributes using index signature
  contract: true,
  department: 'Computer Science',
  hasPhD: true,
  salary: 75000,
  courses: ['JavaScript', 'TypeScript', 'React'],
  officeHours: 'Monday 2-4 PM',
  email: 'david.chen@school.edu'
};

// Example 4: Part-time teacher with different additional attributes
const partTimeTeacher: Teacher = {
  firstName: 'Lisa',
  lastName: 'Anderson',
  fullTimeEmployee: false,
  location: 'Portland',
  // No yearsOfExperience (optional)
  contract: false,
  isSubstitute: true,
  availableDays: ['Tuesday', 'Thursday'],
  hourlyRate: 35,
  backgroundCheck: true
};

// Function to demonstrate readonly properties
function demonstrateReadonlyProperties(): void {
  console.log('\n=== Demonstrating Readonly Properties ===');
  
  const teacher: Teacher = {
    firstName: 'Alice',
    lastName: 'Wilson',
    fullTimeEmployee: true,
    location: 'Denver',
    department: 'Biology'
  };
  
  console.log(`Original name: ${teacher.firstName} ${teacher.lastName}`);
  
  // These lines would cause TypeScript compilation errors:
  // teacher.firstName = 'NewFirstName'; // Error!
  // teacher.lastName = 'NewLastName';   // Error!
  
  // But we can modify other properties:
  teacher.fullTimeEmployee = false;
  teacher.location = 'Phoenix';
  teacher.department = 'Chemistry';
  teacher.newSkill = 'Laboratory Management'; // Add new attribute
  
  console.log('After modifications (name unchanged):', teacher);
  console.log(`Name is still: ${teacher.firstName} ${teacher.lastName}`);
}

// Function to demonstrate dynamic attribute addition
function demonstrateDynamicAttributes(): void {
  console.log('\n=== Demonstrating Dynamic Attribute Addition ===');
  
  const teacher: Teacher = {
    firstName: 'Robert',
    lastName: 'Taylor',
    fullTimeEmployee: true,
    location: 'Chicago'
  };
  
  console.log('Initial teacher:', teacher);
  
  // Add various types of additional attributes
  teacher.contract = true;
  teacher.salary = 60000;
  teacher.hasPhD = false;
  teacher.certifications = ['Teaching License', 'CPR Certified'];
  teacher.startDate = '2020-08-15';
  teacher.performanceRating = 4.8;
  teacher.mentorFor = ['New Teacher 1', 'New Teacher 2'];
  
  console.log('Teacher with dynamic attributes:', teacher);
  
  // Access dynamic attributes
  console.log(`Contract status: ${teacher.contract}`);
  console.log(`Certifications: ${teacher.certifications}`);
  console.log(`Performance rating: ${teacher.performanceRating}`);
}

// Function to validate Teacher objects
function validateTeacher(teacher: Teacher): boolean {
  const requiredProps = ['firstName', 'lastName', 'fullTimeEmployee', 'location'];
  
  for (const prop of requiredProps) {
    if (teacher[prop] === undefined || teacher[prop] === null) {
      console.log(`Validation failed: Missing required property '${prop}'`);
      return false;
    }
  }
  
  // Check types
  if (typeof teacher.firstName !== 'string' || typeof teacher.lastName !== 'string') {
    console.log('Validation failed: firstName and lastName must be strings');
    return false;
  }
  
  if (typeof teacher.fullTimeEmployee !== 'boolean') {
    console.log('Validation failed: fullTimeEmployee must be boolean');
    return false;
  }
  
  if (typeof teacher.location !== 'string') {
    console.log('Validation failed: location must be string');
    return false;
  }
  
  if (teacher.yearsOfExperience !== undefined && typeof teacher.yearsOfExperience !== 'number') {
    console.log('Validation failed: yearsOfExperience must be number when provided');
    return false;
  }
  
  console.log('Teacher validation passed!');
  return true;
}

// Main demonstration function
function runTeacherDemo(): void {
  console.log('=== TEACHER INTERFACE DEMONSTRATION ===');
  
  // Display all example teachers
  console.log('\n--- Example Teachers ---');
  displayTeacherInfo(basicTeacher);
  displayTeacherInfo(experiencedTeacher);
  displayTeacherInfo(detailedTeacher);
  displayTeacherInfo(partTimeTeacher);
  
  // Demonstrate readonly properties
  demonstrateReadonlyProperties();
  
  // Demonstrate dynamic attributes
  demonstrateDynamicAttributes();
  
  // Demonstrate teacher creation with factory function
  console.log('\n=== Using Factory Function ===');
  const factoryTeacher = createTeacher(
    'Jennifer',
    'Lee',
    true,
    'Austin',
    6,
    {
      contract: true,
      department: 'Art',
      specialization: 'Digital Art',
      exhibitionsCount: 12
    }
  );
  displayTeacherInfo(factoryTeacher);
  
  // Validate teachers
  console.log('\n=== Teacher Validation ===');
  validateTeacher(basicTeacher);
  validateTeacher(detailedTeacher);
  
  // Create array of teachers
  const teachers: Teacher[] = [
    basicTeacher,
    experiencedTeacher,
    detailedTeacher,
    partTimeTeacher,
    factoryTeacher
  ];
  
  console.log('\n=== Teachers Summary ===');
  teachers.forEach((teacher, index) => {
    console.log(`Teacher ${index + 1}: ${teacher.firstName} ${teacher.lastName} - ${teacher.fullTimeEmployee ? 'Full-time' : 'Part-time'} in ${teacher.location}`);
  });
}

// Export demonstration function
export { runTeacherDemo };

// Run the demo if this file is executed directly
if (require.main === module) {
  runTeacherDemo();
}
