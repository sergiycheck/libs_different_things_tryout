
function Office(person, mark){
		this.name = mark;

		return `${person.name} is working in ${this.name} `;
}

function callWithTryCatch(callBack,...args){
	console.log('callWithTryCatch, this.name ', this.name)
	try {
		arr = [];
		args.forEach(arg=>{
			if(typeof arg === 'function'){
				arr.push(arg.call(this))
			}else{
				arr.push(arg);
			}
		})

		callBack(...arr);
	} catch (error) {
		console.log(error.toString());
	}
}


exports.callWithTryCatch  = callWithTryCatch;
exports.Office  = Office;