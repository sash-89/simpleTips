import {put, takeLatest} from "@redux-saga/core/effects";
import {requestToGetAdminOrganization} from "../organization/organizationActions";
import {initialization} from "./appInitializedActions";


export function* adminInitializingWatcher (){
    yield takeLatest("INITIALIZED.ADMIN_INITIALIZING", adminInitializingWorker)
}

function* adminInitializingWorker (){
   yield put(requestToGetAdminOrganization());
    // yield put(initialization());
}