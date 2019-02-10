import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import {reducer as auth} from "../../Auth/reducer";
import {reducer as register} from "../../Auth/Register/reducer";
import {reducer as search} from "../../Search/reducer";
import {reducer as loading} from "../Loading/reducer";
import {reducer as error} from "../Errors/reducer";
import {reducer as profile} from "../../Account/reducer";
import {reducer as stripe} from "../Stripe/reducer";
import {reducer as clients} from "../../TherapistAccount/Clients/reducer";
import {reducer as flags} from "../Flags/reducer";
import {reducer as images} from "../Images/reducer";

const reducer = combineReducers({
  form: formReducer,
  auth,
  register,
  search,
  error,
  loading,
  profile,
  banners,
  stripe,
  flags,
  images
});

export default reducer;
