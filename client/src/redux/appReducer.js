const INITIAL_STATE = {
    list:[
        {id:"0", phoneNumber:"if u see this - server is not working"}
    ],
    regions:[
        {name:"Russia", code:7},
    ]
}
const appReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type){
        case "SET_LIST":{
            return{
                ...state,
                list:action.list
            }
        }
        case "SET_REGIONS":{
            return{
                ...state,
                regions:action.regions
            }
        }
        default: return state;
    }
}
export default appReducer;