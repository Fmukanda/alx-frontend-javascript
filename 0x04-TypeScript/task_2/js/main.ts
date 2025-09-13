// DirectorInterface
interface DirectorInterface {
  workFromHome(): string;
  getCoffeeBreak(): string;
  workDirectorTasks(): string;
}

// TeacherInterface
interface TeacherInterface {
  workFromHome(): string;
  getCoffeeBreak(): string;
  workTeacherTasks(): string;
}

// Director class implementing DirectorInterface
class Director implements DirectorInterface {
  workFromHome(): string {
    return 'Working from home';
  }

  getCoffeeBreak(): string {
    return 'Getting a coffee break';
  }

  workDirectorTasks(): string {
    return 'Getting to director tasks';
  }
}

// Teacher class implementing TeacherInterface
class Teacher implements TeacherInterface {
  workFromHome(): string {
    return 'Cannot work from home';
  }

  getCoffeeBreak(): string {
    return 'Cannot have a break';
  }

  workTeacherTasks(): string {
    return 'Getting to work';
  }
}

// Type for employee which can be either Director or Teacher
type Employee = Director | Teacher;

// Function to create employee based on salary
function createEmployee(salary: number | string): Employee {
  // if (salary < 500)
  if (typeof salary === 'number' && salary < 500) {
    return new Teacher();
  } else {
    return new Director();
  }
}

// export function isDirector
function isDirector(employee: Employee): employee is Director {
  // Check if the employee has the workDirectorTasks method specific to Director
  return (employee as Director).workDirectorTasks !== undefined;
}

// 2. executeWork function
function executeWork(employee: Employee): string {
  if (isDirector(employee)) {
    // TypeScript now knows employee is a Director
    return employee.workDirectorTasks();
  } else {
    // TypeScript now knows employee is a Teacher
    return employee.workTeacherTasks();
  }
}

// String literal type named Subjects
type Subjects = 'Math' | 'History';

// Function teachClass
function teachClass(todayClass: Subjects): string {
  if (todayClass === 'Math') {
    return 'Teaching Math';
  } else if (todayClass === 'History') {
    return 'Teaching History';
  } else {
    // This should never happen due to TypeScript's type checking,
    // but provides a fallback for runtime safety
    throw new Error(`Invalid subject: ${todayClass}`);
  }
}

// Demonstration function
export function demonstrateTeachClass(): void {
  console.log('=== teachClass Function Demonstration ===');
  
  // Test with valid subjects
  console.log(`teachClass('Math'): ${teachClass('Math')}`);
  console.log(`teachClass('History'): ${teachClass('History')}`);
  
  // Expected results
  console.log('\nExpected Results:');
  console.log('teachClass(\'Math\');    // Expected: "Teaching Math"');
  console.log('teachClass(\'History\'); // Expected: "Teaching History"');
  
  // Test type safety - this would cause TypeScript error if uncommented:
  // console.log(teachClass('Science')); // Error: Argument of type '"Science"' is not assignable to parameter of type 'Subjects'
}

// Utility function to check if a string is a valid Subject
export function isValidSubject(subject: string): subject is Subjects {
  return subject === 'Math' || subject === 'History';
}

// Export the function and type
export { teachClass, Subjects };
