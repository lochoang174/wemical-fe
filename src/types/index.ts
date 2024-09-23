export interface IToken {
  name: string;
  icon: string;
 
}
export interface InputType{
  id:string,
  title:string,
  token: IToken,
  amount:number
}