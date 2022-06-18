const MyPromise = require('./promise.js');

const t = setTimeout;


describe('my promise tests',()=>{
	
	let myPromise;
	let executorMock;

	const successResult = 'returned success result';
	const errorResult = 'returned error result';

		beforeEach(()=>{

			executorMock = jest.fn(
				resolve=>t(()=>{
						resolve(successResult)
					},240));

			myPromise = new MyPromise(executorMock);
		})

		test('should exist and be type of  function',()=>{
			expect(MyPromise).toBeDefined();
			expect(typeof(MyPromise)).toBe('function');
		})
		test('should contain then, catch, finally',()=>{

			expect(myPromise.then).toBeDefined();
			expect(myPromise.catch).toBeDefined();
			expect(myPromise.finally).not.toBeUndefined();
		})
		test('should call executor function',()=>{
			expect(executorMock).toHaveBeenCalled();
		})
		test('should get data in then method and chain then', async ()=>{
			const result = await myPromise.then(res=>res)
				.then(res=>res.replace('success','from then'));

			expect(result).toBe(successResult.replace('success','from then'));
		})

		test('should catch error',()=>{
			//https://jestjs.io/docs/asynchronous

			expect.assertions(1);

			const errorExecutorMock = jest.fn((_,reject)=>{
				t(()=>{
					reject(errorResult)
				},240)
			})
			const errorPromise = new MyPromise(errorExecutorMock);

			return new Promise(resolve=>{
				errorPromise.catch(function callBackPassedToCatchMethod(dataOfError){
					expect(dataOfError).toBe(errorResult);//check the argument of errorHandler
					resolve();
				})
			})
		})
		test('should always call finally method', async()=>{
			const finallyMock = jest.fn(()=>{});
			await myPromise.finally(finallyMock);

			expect(finallyMock).toHaveBeenCalled();
		})

})