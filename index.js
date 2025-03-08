// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

//function to validate courseId and assignmentId
function validateCourseIDAssignmentID(courseDetail, assignmentDetail){
    if(courseDetail.id !== assignmentDetail.course_id){
        throw new Error("Invalid input:")
    }
}

//function to find valid assignments from learners submitions
function getLearnerAssignmentDetails(assignments , learnerAssignmentID){
  for(let i=0;i<assignments.length;i++){
    if(assignments[i].id === learnerAssignmentID){
      return assignments[i]
    }
  } return null
} 

//function to calculate score
function calculatedScore(submission, assignments ){
  if(isNaN(submission.score || isNaN(assignments.points_possible) || points_possible === 0)){
    throw new Error(`invalid data: Assignmnet ID ${assignments.id} has invalid score or point_possible`)
  }
if(new Date(submission.submitted_at) > new Date(assignments.due_at)){
  submission.score = submission.score - (assignments.points_possible) * 0.1 
}
return Math.max(0, submission.score/assignments.points_possible)
}