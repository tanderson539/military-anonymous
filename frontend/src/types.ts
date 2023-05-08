export type User = {
  id?:number,
  username?:string,
  email?:string,
  branch?:string,
  current_status?:string,
  full_name?:string,
  age_group?:string,
  gender?:string,
  education_level?:string,
  phone_number?:string,
  about_you?:string,
  personal_goals?:Array<string>,
  is_professional?:boolean,
  is_anonymous?:boolean,
  anon_username?:string
}

export type UserData = {
  publicData:User,
  roles:string[]
}

export interface AppContextType {
  user?:UserData;
  setUser?:(value:UserData)=>void;
  url?:string;
  token?:string;
}

export interface AlertType {
  error: boolean;
  message: string
}