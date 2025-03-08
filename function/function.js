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
  
  function dueDateCheck(obj) {
    let assignmetObj = AssignmentGroup.assignments.find(
      (item) => {
        /**
         * Check submitted assignment id is equal to assignment id in the AssignmentGroup
         * if yes
         * check due date is less than current date
         * if yes
         * check submitted assignment is lessThan or equalto due date
         * if yes return true
         * if no reduce 10% from the total score
         *
         * if No
         * return false
         *
         * if no
         *  return false
         *
         *
         */
  
        if (item.id === obj.assignment_id) {
          if (Date.parse(item.due_at) < new Date()) {
            if (
              Date.parse(obj.submission.submitted_at) >
              Date.parse(item.due_at)
            ) {
              obj.submission.score -=
                item.points_possible * 0.1;
            }
            obj.submission.point =
              obj.submission.score / item.points_possible;
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    );
    if (assignmetObj) {
      return obj;
    }
  }
  //dueDAteCheck(LearnerSubmissions[0]);
  let obj = {};
  for (let i = 0; i < LearnerSubmissions.length; i++) {
  
  
    let result = dueDateCheck(LearnerSubmissions[i]);
    if(result){
      if (obj[LearnerSubmissions[i].learner_id]) {
        obj[LearnerSubmissions[i].learner_id][
          LearnerSubmissions[i].assignment_id
        ] = result.submission.score;
      } else {
        obj[LearnerSubmissions[i].learner_id] = {
          [LearnerSubmissions[i].assignment_id]:
            result.submission.score
        };
        }
    }
   
  }
  console.log(Object.keys(obj));
  console.log(Object.values(obj));
  let idArray =  Object.keys(obj)
    for(let i=0;i<idArray.length;i++){
     let scoreObj =  obj[idArray[i]];
  
    }
  