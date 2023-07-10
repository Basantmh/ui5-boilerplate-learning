/* eslint-disable object-shorthand */
//
sap.ui.define(
  ['sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/m/MessageToast'],
  (Controller, JSONModel, MessageToast) => {
    return Controller.extend('ui5boilerplate.controller.Home', {
      // OnInit - lifecycle func
      onInit() {
        const courseList = {
          CourseList: [{ course: 'B.Tech' }, { course: 'B.Com' }, { course: 'BCA' }],
        };
        const membership = { membership: [] };
        var OModel = new JSONModel();
        var OModel1 = new JSONModel();
        // JSON model for course
        OModel.setData(courseList);
        // named model binding, useful when we have multiple model in the same view
        this.getView().setModel(OModel, 'CourseModel');
        // JSON model for membership
        OModel1.setData(membership);
        this.getView().setModel(OModel1, 'membership');
        this.setMaxDobDate();
      },
      // Set max date for date picker control
      setMaxDobDate() {
        const dob_picker = this.getView().byId('dob_picker');
        const max_date = new Date();
        dob_picker.setMaxDate(max_date);
      },
      // create and save membership
      saveMembership() {
        const studentId = this.getInputValue('student_id');
        const name = this.getInputValue('name');
        const date_of_birth = this.getInputValue('dob_picker');
        const mail_id = this.getInputValue('email');
        const resident_type = this.getResidentType();
        const interest = this.getInterest();
        const course = this.getCourse();
        const membership = {
          studentId: studentId,
          name: name,
          dateOfBirth: date_of_birth,
          mailId: mail_id,
          residentType: resident_type,
          interest: interest,
          course: course,
        };
        const membershipObj = this.getView().getModel('membership').getData();
        if (!this.validateMembership(membershipObj.membership, studentId)) {
          membershipObj.membership.push(membership);
          this.getView()
            .getModel('membership')
            .setProperty('/membership', membershipObj.membership);
          MessageToast.show('Membership created successfully!', {
            duration: 2000,
          });
        } else {
          MessageToast.show('Error creating membership!', {
            duration: 2000,
          });
        }

        console.log(this.getView().getModel('membership').getData());
      },
      // Get input value for control which have getValue method
      // optional chaining to handle access error
      getInputValue(id) {
        return this.getView().byId(id).getValue?.();
      },

      // Get resident Type value
      getResidentType() {
        return this.getView().byId('resident_type').getSelectedButton().getText();
      },
      // Get array list of interest
      getInterest() {
        let interest = [];
        if (this.getView().byId('interest_1').getSelected()) {
          interest.push('interest_1');
        }
        if (this.getView().byId('interest_2').getSelected()) {
          interest.push('interest_2');
        }
        return interest;
      },
      // Get course text from combo box control
      getCourse() {
        return this.getView().byId('course').getSelectedItem().getText();
      },
      // Check if student ID already exist
      validateMembership(membershipArr, studentId) {
        return membershipArr.find((currentValue) => {
          return currentValue.studentId === studentId;
        });
      },
    });
  }
);
