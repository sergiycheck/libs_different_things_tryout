
const {callWithTryCatch} = require(`./userHelper`);

function Person(name){
	this.name = name;
}

Person.prototype.go = function(){
	return `${this.name} is going`;
}


function Manager(name,state){
	Person.call(this,name);
	this.state = state;
}
Manager.prototype = Object.create(Person.prototype);
Manager.prototype.constructor = Person;

Manager.prototype.manage = function (who){

	// const name = who? who.name: 'some worker';
	// return `${this.name} is managing ${name}`;

	return `${this.name} is managing ${[who? who.name: 'some worker']}`;
}
const individualArrow = ()=>{
	return `individual method of ${this.name}`;
}

function individualFunc(){
	return `individual method of ${this.name}`;
}


function Student(name,course){
	this.base = Person;
	this.base(name);
	this.course = course;
}
Student.prototype = new Person;


function Employee(name,jobInfo,course){
	Student.call(this,name,course);

	this.jobInfo = jobInfo;
}
Employee.prototype = new Student


function initObjects(){

	const personObj = new Person('Person Name');
	console.log('Person name',personObj.name);

	const managerObj = new Manager('Manager Name','state of project 10');
	console.log('Manager info', managerObj.name, managerObj.state);

	const studentObj = new Student('Student Name','information and programming');
	console.log('Student info', studentObj.name, studentObj.course);

	const employeeObj = new Employee('Employee Name','Google','employee engineering');
	console.log('Empoyee info', employeeObj.name, employeeObj.jobInfo, employeeObj.course);

}

function describe(){
	const personObj = new Person('Person Name');
	const managerObj = new Manager('Manager Name','state of project 10');

	console.log(`personObj.go() `,personObj.go());

	console.log(`managerObj.manage() `,managerObj.manage(personObj));
	console.log(`managerObj.go() `,managerObj.go());

	const boundIndividualArrowToManager = individualArrow.bind(managerObj);

	console.log(`calling boundIndividualArrowToManager with losing this `,boundIndividualArrowToManager());

	const boundIndividualFuncToManager = individualFunc.bind(managerObj);

	console.log(`calling boundIndividualFuncToManager `,boundIndividualFuncToManager());

	console.log(`individualArrow.call(managerObj) with losing this `, individualArrow.call(managerObj))
	console.log(`	individualFunc.call(managerObj)`, 	individualFunc.call(managerObj))


	callWithTryCatch(console.log, managerObj.individual,`managerObj.individual() `)
	callWithTryCatch(console.log,`managerObj.manage() `, managerObj.manage)
	callWithTryCatch(console.log,`personObj.manage() `, personObj.manage)
	callWithTryCatch(console.log,`personObj.individual() `, personObj.individual)

	console.log(`callWithTryCatch.call(managerObj,console.log, managerObj.manage, 'managerObj.manage() ')`);
	callWithTryCatch.call(managerObj,console.log, managerObj.manage,`managerObj.manage() `)

	console.log(`Person.prototype == Manager.prototype  `,Person.prototype == Manager.prototype);
	console.log(`Person.prototype  `,Person.prototype);
	console.log(`Manager.prototype  `, Manager.prototype);
	console.log(`personObj.__proto__ == managerObj.__proto__  `,personObj.__proto__ == managerObj.__proto__);
	console.log(` managerObj.__proto__  `, managerObj.__proto__);
	console.log(`personObj.__proto__ `,personObj.__proto__);


	// Object.entries(personObj).forEach(([key,val])=>{
	// 	console.log(`key: ${key}, val: ${val}`);
	// });


	// console.log(`personObj `,personObj);
	// console.log(`Person `,Person);
	// console.log(`Person.prototype `,Person.prototype);
	// console.log(`new Person `,new Person);




}




(function main(){
	//initObjects();
	describe();

})()




