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
function validateCourseIDAssignmentID(
  courseDetail,
  assignmentDetail
) {
  if (courseDetail.id !== assignmentDetail.course_id) {
    throw new Error("Invalid input:");
  }
}

//function to find valid assignments from learners submitions
function getLearnerAssignmentDetails(
  assignments,
  learnerAssignmentID
) {
  for (let i = 0; i < assignments.length; i++) {
    if (assignments[i].id === learnerAssignmentID) {
      return assignments[i];
    }
  }
  return null;
}

// function to calculate score
function calculatedScore(submission, assignments) {
  let score = Number(submission.score);
  const pointPossible = Number(assignments.points_possible);
  if (
    isNaN(
      score ||
        isNaN(assignments.points_possible) ||
        pointPossible === 0
    )
  ) {
    throw new Error(
      `invalid data: Assignmnet ID ${assignments.id} has invalid score or point_possible`
    );
  }
  if (
    new Date(submission.submitted_at) >
    new Date(assignments.due_at)
  ) {
    score = score - Math.round(pointPossible * 0.1);
  }
  let percentage = Math.max(
    0,
    convertToFixedDecimal(score / pointPossible)
  ); // cheking if score is less than 0 return null
let scoreObject = {
  "score" : score,
  "percentage" : percentage,
}
  return scoreObject ;
}
// changing the numberWithFractions to only 3 decimalPoint if the fractions more than 5 digit.
function convertToFixedDecimal(decimalNumber) {
  return decimalNumber.toString().length > 5
    ? decimalNumber.toFixed(3)
    : decimalNumber;
}

function getLearnerData(
  courseDetail,
  assignmentDetail,
  learnerSubmissionDetail
) {
  try {
    validateCourseIDAssignmentID(
      courseDetail,
      assignmentDetail
    );

    const finalLearnerSubmissionDetails = {};
    // Extractin
    learnerSubmissionDetail.forEach((submission) => {
      //Extracting attributes from learnerSubmissions object
      const {
        learner_id,
        assignment_id,
        submission: submissionDetails,
      } = submission;

      const assignmentInfo = getLearnerAssignmentDetails(
        assignmentDetail.assignments,
        assignment_id
      );

      if (!assignmentInfo) {
        // Ignore if not a valid assignment id
        return;
      }
      if (new Date(assignmentInfo.due_at) > new Date()) {
        return; // skip assignment id which is due date greater than current date
      }
      // console.log(assignment)

      const scoreObject = calculatedScore(
        submissionDetails,
        assignmentInfo
      );
      // console.log(scorePercentage);
      // Initialize final Learner details
      if (!finalLearnerSubmissionDetails[learner_id]) {
        finalLearnerSubmissionDetails[learner_id] = {
          id: learner_id,
          totalScore: 0,
          totalPoint: 0,
        };
      }

      finalLearnerSubmissionDetails[learner_id][
        assignment_id
      ] = scoreObject.percentage;
      finalLearnerSubmissionDetails[
        learner_id
      ].totalScore += Number(scoreObject.score);
      finalLearnerSubmissionDetails[
        learner_id
      ].totalPoint += Number(
        assignmentInfo.points_possible
      );
    });
    //Average calculation
    return Object.values(finalLearnerSubmissionDetails).map(
      (detail) => {
        let finalResultObject = {
          ...detail,
          avg: convertToFixedDecimal(
            detail.totalScore / detail.totalPoint
          ),
        };
        delete finalResultObject.totalScore;
        delete finalResultObject.totalPoint;
        return finalResultObject;
      }
    );
  } catch (e) {
    console.error("An error occurred:, error.message");
  }
}

const result = getLearnerData(
  CourseInfo,
  AssignmentGroup,
  LearnerSubmissions
);
console.log(result);
