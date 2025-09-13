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
