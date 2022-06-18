const noop = ()=>{};

class MyPromise{
	constructor(executor){
		this.queue = [];
		this.onResolve = this.onResolve.bind(this);
		this.onReject = this.onReject.bind(this);
		this.errorHandler = noop;
		this.finallyHandler = noop;

		this.errorHandler = this.errorHandler.bind(this);
		this.finallyHandler = this.finallyHandler.bind(this);
		
		if(executor){
			try {
				executor.call(this ,this.onResolve,this.onReject);//losing this without bind
			} catch (error) {
				this.errorHandler(error);
			}finally{
				this.finallyHandler();
			}
			
		}
		return this;
	}
	onResolve(data){
		this.queue.forEach(callback=>{
			data = callback(data);
		})
		this.finallyHandler();
	}

	onReject(dataError){
		this.errorHandler(dataError);

		this.finallyHandler();
		return this;
	}

	then(callback){
		console.log('then call');
		this.queue.push(callback);
		return this;
	}
	catch(callback){
		this.errorHandler = callback;
		return this;
	}
	finally(callback){
		console.log('finally call');
		this.finallyHandler = callback;
		return this;
	}

}

module.exports = MyPromise;

const promise = new MyPromise( async (resolve,reject)=>{
	const timeOutId = setTimeout(()=>{
		//resolve('resolved value');
		reject('rejected value');

		clearTimeout(timeOutId);
	},1000)
})

promise.then((resolvedValue)=>{
	console.log(`resolved value is`,resolvedValue);
	return resolvedValue.toUpperCase();;
}).then((value)=>{
	console.log('second then value',value);
	return value;
})
.catch((error)=>{
	console.log('there is an error occurred ',error);
})
.finally(()=>console.log('final result'));
