import {ADD_USER} from '../Constants'

export  const  addUser  = (user : string) =>{
  return {
    type : ADD_USER,
    payload : user
  }
}