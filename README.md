<h1 align="center">NOQue-X</h1>
<p align="center">
</p>

<a href="https://hack36.com"> <img src="http://bit.ly/BuiltAtHack36" height=20px> </a>

<p align="center">
    <a href="https://youtu.be/q-Npr7mLHXM">Demo Link</a>
    •
    <a href="https://docs.google.com/presentation/d/1H7r74Y8QK3lOkbIKFTp_GUN-KyRN8xbEFrCgHMoxCew/edit?usp=sharing" >PPT Link</a>
  </p>



## The Problem:

Online classes call for a greater amount motivation and self-discipline than a classroom-based course.
Students can easily shift away from ongoing classes and waste their time. An offline classroom has one or more instructors and peers, who can hold a student accountable for their course-work, however in online classes teachers don't get a proper feedback and can't keep a check on student's learning and understanding. Online classes have just become a boring non-interactive class for teachers
Generally students open the class meeting and do something else like watching youtube, facebook, etc or they keep the class meet open or go away somewhere else.

So how do we make online classes better and effective? That's where our <b>NOQUE-X</b> comes in.

## Our Solution

The problem can be solved if a teacher can know whether a student is both physically and mentally present in the classroom.

Let’s say teacher is going to teach topic A, B, C. He will prepare some short questions for each topic that a student must be able to answer. After he explains a topic, using our extension he can broadcast the question he prepared to all the students in a single click. Students will have to give answer by the time teacher has allocated for that question. Teacher can then move on to next topic and repeat the process when required. Using this, teacher can get feedback of how many students attempted and how many got it correct. Teacher also gets notified if a student who has joined the classroom does anything else except attending the class.

### Techniqual Aspects

- By using chrome extension, web sockets we broadcasts the questions from teachers extension panel to the all the students (those are in google meet lecture) and receives responses through the same

- Realtime activities of students such as tab switching, video or audio firing, web searching and downloading files etc.

- Total Active time during lecture also tracked to find attendance of students

- Only the authenticated users who are students of the class can receive the Questions from respective teacher & are able to send responses

- Also secured websockets connections throughout the Lecture

### Challanges we ran into

- Shared localstorage among the all the chrome user made impossible to show our working demo on same computer (we tackled this by cookie based authenication)

- Realtime dialog injection in meet on every question brodcasting event by teacher

## Technology Stack:

1. Chrome Extension
2. Node.js
3. React.js
4. Express.js
5. Socket.io
6. Ant design
7. MongoDB
8. JQuery

## Contributors:

**Team Name: Thursday**

- [Rohit Bakoliya](https://github.com/rohitbakoliya)
- [Hardik Upadhyay](https://github.com/Simply-divine)
- [Smit Patel](https://github.com/C2OO13/)

### Made at:

<a href="https://hack36.com"> <img src="http://bit.ly/BuiltAtHack36" height=20px> </a>
