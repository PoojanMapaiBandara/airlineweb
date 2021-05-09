

export class Staff {

  constructor(public email: string,
              public id: string,
              public name: string,
              public usertype: string,
              public epfNumber: string,
              public designation: string,
              public nic: string,
              public status: string,
              private token: string
  ) {}
// special type of property
  get _token(){
    return this.token;
  }


}
