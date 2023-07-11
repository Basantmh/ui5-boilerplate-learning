sap.ui.define([], () => {
  return {
    membershipBuffer: {
      studentId: '',
      name: '',
      dateOfBirth: '',
      mailId: '',
      residentType: {
        hosteller: true,
        nonHosteller: false,
      },
      interest: {
        fiction: false,
        nonFiction: false,
      },
      course: '',
    },
  };
});
