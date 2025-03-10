/**
 * There are 3 input groups: Course Info, Assignment Group (with an assignments array), and Learner Submission (with a submission object).
 * The result should include:
 1.Learner ID
 2.Average Score: Calculated as the sum of all submitted assignment scores (including late submission adjustments) divided by the sum of all submitted assignment point_possible values.
 3. Assignment ID: Calculated as the submitted assignment score (including late submission adjustments) divided by the point_possible score.
 * Constrains:
 1.Verify that the Assignment Group ID and Course ID are the same; otherwise, throw an error.
 2.Ensure the point_possible value is non zero and non-numeric.
 3.Ensure the Learner Score value is non zero and non-numeric.
 4.Get the valid assignments for validation by excluding assignments with due dates later than the current date.
 */

//Inputs
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

// Reusable function to verify that the Assignment Group ID and Course ID are the same; otherwise, throw an error.
function verifyCourseIDAndAssignmetnID(
  courseDetail,
  assignmentGroupDetail
) {
  if (courseDetail.id !== assignmentGroupDetail.course_id) {
    throw new Error(
      `Invalid input: Assignment course_Id: ${assignmentGroupDetail.course_id} is not match with Course ID: ${courseDetail.id}`
    );
  }
}

// Resusable function to calculate score - The submitted assignment score (including late submission adjustments) divided by the point_possible score.
function calculatedScore(submissionObj, assignemnt) {
  const submission = submissionObj.submission;
  // Passing parameter LearnerSubmission.submission and AssignemtnGroup.assignments
  let score = Number(submission.score);
  let pointPossible = Number(assignemnt.points_possible);
  /**
   * Ensure the point_possible value is non zero and non-numeric.
   * Ensure the Learner Score value non-numeric.
   */
  if (
    score === isNaN ||
    pointPossible === isNaN ||
    pointPossible === 0
  ) {
    throw new Error(
      `Invalid input: Assignment ID: ${assignemnt.id} has invalid value in score or point possible`
    );
  }

  //Detect 10% for late submission to score from pointPossible
  if (
    Date.parse(submission.submitted_at) >
    Date.parse(assignemnt.due_at)
  ) {
    // checking submitted due date is greater than assignment due date
    score = score - Math.round(pointPossible * 0.1);
  }
  let percentage = convertToFixedDecimal(
    score / pointPossible
  );

  // Creating an object to store the score and percentage separately, allowing them to be calculated independently for the average and final score in the result.
  let scoreObject = {
    score: score,
    percentage: percentage,
  };

  return scoreObject;
}

//Function to round the decimal points to 3, rounding up if the fourth decimal place is 5 or higher.(To match the output)
function convertToFixedDecimal(decimalNumber) {
  return decimalNumber.toString().length > 5
    ? Number(decimalNumber.toFixed(3))
    : decimalNumber;
}

//Function to get the valid assignments for validation by excluding assignments with due dates later than the current date.
function getValidAssignments(assignmentList) {
  return assignmentList.filter(
    (assignment) =>
      Date.parse(assignment.due_at) <= new Date()
  );
}

//Function to get assignment Info by comparing assignment Id in assignment list and Learner submission assignment Id
function getAssignmentInfo(
  assignmentList,
  learnerAssignmentID
) {
  let assignmentInfo = null;
  for (let i = 0; i < assignmentList.length; i++) {
    if (assignmentList[i].id === learnerAssignmentID) {
      assignmentInfo = assignmentList[i];
      break;
    }
  }
  return assignmentInfo;
}

function getLearnerData(
  courseDetail,
  assignmentDetail,
  learnerSubmissionList
) {
  try {
    verifyCourseIDAndAssignmetnID(
      courseDetail,
      assignmentDetail
    );

    let validAssignments = getValidAssignments(
      assignmentDetail.assignments
    );

    //initializing finalResult as empty object
    const finalSubmissionDetails = {};
    // looping through the learner submission details array and getting each object keys.
    learnerSubmissionList.forEach((submission) => {
      const {
        learner_id,
        assignment_id,
        submission: submissionDetails,
      } = submission;

      let assignmentInfo = getAssignmentInfo(
        validAssignments,
        assignment_id
      );
      if (assignmentInfo) {
        //calculatedScore is returning the object with score and percentage.
        let scoreObject = calculatedScore(
          submission,
          assignmentInfo
        );

        let score = scoreObject.score;
        let percentage = scoreObject.percentage;

        //consolidated object from the Learner submission detail
        const calculatedObject = {
          assignmentId: assignment_id,
          score: score,
          percentage: percentage,
          pointPossible: assignmentInfo.points_possible,
        };

        // initializing finalSubmissionDetails - adding the key value pair of id, totalSubmittedAssignmentScore(totalScore) and totalSubmittedAssignmentPointPossible score(totalPointPossibleScore)
        if (!finalSubmissionDetails[learner_id]) {
          finalSubmissionDetails[learner_id] = [
            calculatedObject,
          ];
        } else {
          finalSubmissionDetails[learner_id].push(
            calculatedObject
          );
        }
      }
    });

    let result = [];

    for (let id in finalSubmissionDetails) {
      let learnerObject = { id: id };
      let submissionList = finalSubmissionDetails[id];
      let totalScore = 0;
      let totalPointPossible = 0;
      for (let i = 0; i < submissionList.length; i++) {
        learnerObject[submissionList[i].assignmentId] =
          submissionList[i].percentage;
        totalScore += submissionList[i].score;
        totalPointPossible +=
          submissionList[i].pointPossible;
      }

      let avg = convertToFixedDecimal(
        totalScore / totalPointPossible
      );
      learnerObject["avg"] = avg;
      result.push(learnerObject);
    }
    return result;
  } catch (e) {
    console.error(e.message);
  }
}
const result = getLearnerData(
  CourseInfo,
  AssignmentGroup,
  LearnerSubmissions
);
console.log(result);
