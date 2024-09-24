export interface IToken {
  name: string;
  subname:string;
  icon: string;
  type:string
 
}
export interface InputType{
  id:string,
  action:ActionType,
  token: IToken,
  amount:number
}
export interface ActionType{
  title:string,
  icon: JSX.Element
}