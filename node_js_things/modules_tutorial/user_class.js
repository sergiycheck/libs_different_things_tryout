class User{
	constructor(name,age,email){
		this.name = name;
		this.age = age;
		this.email = email;
	}
	getUserInto(){
		return `
			Name ${this.name}
			Age ${this.age}
			Email ${this.email}
		`
	}

}

//module.exports only one thing

module.exports = User;