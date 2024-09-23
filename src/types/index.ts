export interface IToken {
  name: string;
  icon: string;
  type:string
 
}
export interface InputType{
  id:string,
  title:string,
  token: IToken,
  amount:number
}