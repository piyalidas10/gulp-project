class Person {
    constructor(fname, lname) {
       this.fname = fname;
       this.lname = lname;
    }
 
    get fullname() {
       return this.fname +"-"+this.lname;
    }
 }

 const person = new Person('Piyali', 'Das');
 document.getElementById("name").innerHTML = person.fname + " " + person.lname;
 console.log(person);