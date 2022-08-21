import { Component } from '@angular/core';
import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TestExercise';
  public contacts: any;
  firstName = "";
  lastName = "";
  phone = "";

  constructor(private testService: TestService) {
    
  }

  ngOnInit(): void {
    this.myServices();
  }
  myServices() {
    this.testService.getContacts().subscribe
      ((data) =>
        this.contacts = data)
  }
  onDeleteAction(empId: any) {
    this.deleteEmployeeFromServer(empId);
  }
  onEditAction(empId: any) {
    this.editEmployeeFromServer(empId);
  }
  
  onAddEmployeeAction() {
    let newEmployee = {
      id: "", 
      firstName: this.firstName,
      lastName: this.lastName,
      phone:this.phone
    };

    this.addEmployeeToServer(newEmployee);
  }
  addEmployeeToServer(newEmployee: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
  }) {
    this.testService.addEmployee(newEmployee).subscribe(
      (resp) => {
        if (resp.status == 200) {
          this.contacts.push(resp.body);
          localStorage.setItem('users', JSON.stringify(this.contacts));
          this.firstName = "";
          this.lastName = "";
          this.phone="";
        }
      },
      (err) => console.error("Error Occured When Add A New Employee " + err)
    );
  }
  deleteEmployeeFromServer(empId: any) {
    this.testService.deleteEmployee(empId).subscribe(
      (resp) => {
        if (resp.status == 200) {
          const deletedEmpId = resp.body;
          this.contacts = this.contacts.filter((f: { id: any; }) => f.id !== deletedEmpId);
          localStorage.setItem('users', JSON.stringify(this.contacts));
        }
      },
      (err) => console.error("Error Occured When Delete An Employee " + err)
    );
  }
  editEmployeeFromServer(cont: any) {
    this.testService.editEmployee(cont).subscribe(
      (resp) => {
        if (resp.status == 200) {
          const param = resp.body;
          let contact = this.contacts.find((x: { id: any; }) => x.id === param);
          Object.assign(contact, param);
          localStorage.setItem('users', JSON.stringify(this.contacts));
        }
      },
      (err) => console.error("Error Occured When Delete An Employee " + err)
    );
  }
}
