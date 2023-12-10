import {combineReducers} from "redux" 
    
let init = {
    connect: {
        id: "welcome"
    }
}

let theme = {
    dark: {
        backgroundColor: "black",
        color:"white"
    },
    normal: {
        backgroundColor: "",
        color:""
    }
}
let ChatRoomReducer = (state = init, action)=>{
    
    switch (action.type) {

        case "changeChatRoom":
            let temp = action.payload;
            return ({ ...state, connect: temp });
        default:
            return state
     }
}

let ThemeReducer = (state = theme.normal, action) => {


    switch (action.type) {

        case "changeTheme": {
            let temp = action.mode;
            let res = temp == "dark" ? theme.dark : theme.normal;
            return res;
        };
        default:
            return state;
     }
}

let rootReducer = combineReducers({
    ChatRoomReducer,
    ThemeReducer
})

export default rootReducer
