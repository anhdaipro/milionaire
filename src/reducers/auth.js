const initialState = {
    value: 0,
}
const authreduces=(state=initialState,action)=>{
    const {type,payload}=action
    switch(type){
        case type=="Hâkakka":
            return {...state,value:1}
        default:
            return state
    }

}
export default authreduces