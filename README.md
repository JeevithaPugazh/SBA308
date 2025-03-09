This Assignment is to get the LearnerData from inputs CourseInfo , AssignmentGroup and LearnerSubmissions 
Sample input structure:

    * A CourseInfo object, which looks like this:
            {
            "id": number,
            "name": string,
            }

    * An AssignmentGroup object, which looks like this:
            {
            "id": number,
            "name": string,
            // the ID of the course the assignment group belongs to
            "course_id": number,
            // the percentage weight of the entire assignment group
            "group_weight": number,
            "assignments": [AssignmentInfo],
            }

    * Each AssignmentInfo object within the assignments array looks like this:
            {
            "id": number,
            "name": string,
            // the due date for the assignment
            "due_at": Date string,
            // the maximum points possible for the assignment
            "points_possible": number,
            }

    * An array of LearnerSubmission objects, which each look like this:
            {
            "learner_id": number,
            "assignment_id": number,
            "submission": {
            "submitted_at": Date string,
            "score": number
            }
            }

Helper functions are:

* verifyCourseIDAndAssignmetnID(courseDetail,assignmentGroupDetail):

        * Function to verify that the Assignment Group ID and Course ID are same; otherwise, throw an 
          error.

* calculatedScore(submissionObj, assignemnt): 

        * Function to calculate score - The submitted assignment score (including late submission       
          adjustments) divided by the point_possible score.
        * Checking the point_possible value is non zero and non-numeric.
        * Checking the Learner Score value non-numeric.
        * Detecting 10% for late submission to score from pointPossible

* convertToFixedDecimal(decimalNumber):

        *Function to round the decimal points to 3, rounding up if the fourth decimal place is 5 or higher.

* getValidAssignments(assignmentList):

        * Function to get the valid assignments for validation by excluding assignments with due dates 
          later than the current date. 

* getLearnerAssignmentDetails(assignmentList,learnerAssignmentID):

        * Function to get assignment Info by comparing assignment Id in assignment list and Learner 
          submission assignment Id    

Main function :

function getLearnerData(courseDetail,assignmentDetail,learnerSubmissionList)

* First inside the try catch method calling the verifyCourseIDAndAssignmetnID().
* Inside catch creating the object to object called finalSubmissionDetails which contains the group of need data consolidated from LearnerSubmission object and AssignmentInfo object
* Using foreach method in learner submission array to loop through each object and assigned the result in finalSubmissionDetails.
* Using helper function calculatedScore() added score and percentage

Sample finalSubmissionDetails object:

{
  '125': [
    { assignmentId: 1, score: 47, percentage: 0.94, pointPossible: 50 }
  ]
}

{
'132': [
    { assignmentId: 1, score: 39, percentage: 0.78, pointPossible: 50 }
]
}

* Initialized the result array
* looped each id in to the finalSubmissionDetails object and created the new object called learnerObject and added the id as property.
* loop through all the objects in the finalSubmissionDetails and got totalScore and totalPointPossible values for each id.
* Outside the loop created a variable called avg and calculate the average using totalScore / totalPointPossible.
* added avg variable inside the learnerObject 

* Pushed the learnerObject in to the result array.

    



