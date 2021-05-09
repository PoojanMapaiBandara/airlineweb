

export class User {

  constructor(public email: string,
              public id: string,
              public name: string,
              public usertype: string,
              public phone: string,
              public country: string,
              public nic: string,
              private token: string
  ) {}
// special type of property
  get _token(){
    return this.token;
  }


}
