'use strict';


const JsonOperations= () => {
	
	const createAndRestorePerson = ()=>{
		const person = {
			name:'PersonJ',
			date: Date.now(),
			number: 4
		}
	
		const jsonPerson  = JSON.stringify(person);
		
		console.log(jsonPerson);
	
		const personRestored = JSON.parse(jsonPerson,(key,value)=>{
			if(key=='date'){
				return new Date(value);
			}
			return value;
		})
	
		console.log(personRestored);	
	}
	

	const deleteCyclicReference = ()=>{
		
	let room = {
		number: 23
	};
	
	let meetup = {
		title: "Совещание",
		occupiedBy: [{name: "Иванов"}, {name: "Петров"}],
		place: room
	};
	room.occupiedBy = meetup;
	meetup.self = meetup;
	
	console.log( JSON.stringify(meetup, (key, value) =>{
		if(key=='place'){
			value.occupiedBy = null;
		}
		if(key=='self'){
			value = null;
		}

		return value;
	}));

	}


	
	deleteCyclicReference();
}

const contextBinding=()=>{
	let user = {
		firstName: "Вася"
	};
	
	function func(phrase) {
		console.log(phrase + ', ' + this.firstName);
	}

	//let funcUser = func.bind(user);
	const phrases = ['My phrase','Second phrase','Third phrase'];
	func.call(user,phrases);

}

const argsArguments = ()=>{
	const paramsMultiplier = (num,...args)=>{
		return args.map(el=>{
			return num*el;
		})
	}
	const res = paramsMultiplier(3,4,1,44,3,3244);
	console.log(res);
}

const partialFuncExample=()=>{

	const partial = (func,...argsBound)=>{
		return function(...args){
			return func.call(this,...argsBound,...args);
		}
	}

	const user={
		name:'UserName',
		surname:'User_surname',
		sayInfo(date, phrase){
			console.log(`[${date}] ${this.name}, ${this.surname} says: ${phrase}`);
		}
	}

	user.func = partial(user.sayInfo,`${new Date().getMinutes()}:${new Date().getSeconds()}`);

	user.func('My unique phrase');
}

function arrDiscount(){
	const discountPrices=(prices,discount)=>{
		return prices.map((element)=>
		{
			return Math.round(element*(1-discount)*100)/100;
		});
	}

	const pricesWithAppliedDiscount = discountPrices([100, 200, 300], .5);
	console.log(pricesWithAppliedDiscount);
}


function generateAndSortRandomNumbers (){
	let randomNums = [];
	for(let i = 0;i<10;i++){
		randomNums.push(getRandomInt(0,100));
	}
	console.log('randomNums');
	console.log(randomNums);
	console.log(randomNums.length);

	function bubbleSort(arr){
		let max = arr[0];
		for (let i = 0; i < arr.length; i++) {
			for(let j = 0;j<arr.length;j++){
				if(arr[j]<arr[i]){
					let temp = arr[j];
					arr[j] = arr[i];
					arr[i] = temp;
				}
				if(arr[j]>max){
					max = arr[j];
				}
			}
		}
		return arr;
	}
	console.log('bubble sort nums');
	let bubbleSortedNums = bubbleSort(randomNums);
	console.log(bubbleSortedNums);
	console.log(bubbleSortedNums.length);

}

function getRandomInt(min,max){
	min = Math.floor(min);
	max = Math.ceil(max);
	return Math.floor(Math.random()*(max-min+1))+min
}

function getFibonachiNums(){
	let num = getRandomInt(15,20);
	console.log('Generated number',num);
	fibNums(0,1,0,num);

	function fibNums(first,second,count,length){
		console.log('number = ',first,' count = ',count);
		if(count>length){
			return;
		}
			
		fibNums(second,first+second,++count,length)
	}

}

function serviceContainer(){

	class Service{
		constructor(){
			this.numbers = [1,2,3,4];
			this.token = 'token';
			// this.doSomething = this.doSomething.bind(this);
		}

		//The arrow function does not have its own this //It takes the this value from its parent.

		doSomething(){

			//---error implementation
			// setTimeout(function doAnotherThing(){
			// 	Array.from(this.numbers).forEach(function log(number){

			// 			console.log(number);
			// 			console.log(this.token);
			// 	})
			// }, 100);

			//---solved implementation
			// setTimeout(function doAnotherThing(){
			// 	Array.from(this.numbers).forEach(function log(number){

			// 			console.log(number);
			// 			console.log(this.token);
			// 	}.bind(this))
			// }.bind(this), 100);


			//---error implementation
			// setTimeout(function doAnotherThing(){
			// 	Array.from(this.numbers).forEach(function log(number){
			// 			console.log(number);
			// 			console.log(this.token);
			// 	})
			// }, 100);


			//---solved implementation
			// let that = this;
			// setTimeout(function doAnotherThing(){
			// 	Array.from(that.numbers).forEach(function log(number){

			// 			console.log(number);
			// 			console.log(that.token);
			// 	})
			// }, 100);

			//no function name bad readability
			// const timeOutId = setTimeout(()=>{
			// 	this.numbers.forEach((num)=>{
			// 		console.log('num = ', num);
			// 		console.log('token = ',this.token)
			// 	});
			// 	clearTimeout(timeOutId);
			// },500)

			//good readability
			const printNum = num => {
				console.log('num = ', num);
				console.log('token = ', this.token);
			}
			const loopThroughNums = ()=>{
				this.numbers.forEach(printNum);
			}
			const wrapperOfLoopThroughNums = (fn, ...args)=>{
				loopThroughNums();
				
				fn.call(TimeOut);
				
			}
			const setTimeOutForFunc = (milliseconds,callBack)=>{

				const timeOutObj = new TimeOut(function func(){
						console.log('this ', this);
						callBack(timeOutObj.clear)
					}.bind(TimeOut),milliseconds);
					
			}
			setTimeOutForFunc(250,wrapperOfLoopThroughNums.bind(TimeOut))
			
			function TimeOut(fn,interval){
				let id = setTimeout(fn,interval);
				this.cleared = false;

				this.clear = ()=>{
					console.log('calling clear')
					this.cleared = true;
					clearTimeout(id);
				}

			}



		}


	}
	const serviceObj = new Service();
	serviceObj.doSomething();

}

function serviceContainerSecond(){
	class Service{
		constructor(){
			this.token = 'token value';

			this.doSomething = this.doSomething.bind(this);
		}
		doSomething(){
			console.log(this.token);
		}
	}
	const service = new Service();

	//service.doSomething();

	function r(fn){
		fn();
	}
	r(service.doSomething)

}




(function main(){

	serviceContainerSecond();
	//serviceContainer();

	//JsonOperations();
	// contextBinding();
	// argsArguments();

	//partialFuncExample();
	//arrDiscount();
	//generateAndSortRandomNumbers();
	//getFibonachiNums();

})();


