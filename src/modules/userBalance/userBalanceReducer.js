import {USER_BALANCE} from "./userBalanceActions";


let initialState = {
    cardData: null,


//   {"id":"card_1HGQCjKO3i6FRO87b6rj4Ul3",
//     "object":"card",
//     "brand":"MasterCard",
//     "country":"US",
//     "customer":"cus_HUNussCSHIuwx6",
//     "exp_month":8,
//     "exp_year":2021,
//     "fingerprint":"aC4gzuy2FlyjoA8H",
//     "funding":"credit",
//     "last4":"4444",
//     "user":{}
// };

};
const userBalanceReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case USER_BALANCE.SET_CARD_DATA:
            return {
                ...state,
                cardData: payload,
            };
        default:
            return state
    }

};

export default userBalanceReducer;