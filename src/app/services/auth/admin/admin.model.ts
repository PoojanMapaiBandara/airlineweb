

export class Admin {

  constructor(public email: string,
              public type: string,
              private token: string
  ) {}
// special type of property
  get _token(){
    return this.token;
  }


}
