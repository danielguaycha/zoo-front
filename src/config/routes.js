import {ANIMAL_ADD, ANIMAL_EDIT, ANIMAL_LIST, HOME, LOGIN} from "./urls";
import Login from "../pages/Login";
import Home from "../pages/Home";
import CreateAnimal from "../components/animals/CreateAnimal";
import ListAnimal from "../components/animals/ListAnimal";
import EditAnimal from "../components/animals/EditAnimal";

export const routes = [
    {
        path: HOME,
        name: 'home',
        exact: true,
        private: false,
        component: Home
    },
    {
        path: LOGIN,
        name: 'login',
        exact: true,
        private: false,
        component: Login
    },
    // admin
    {
        path: ANIMAL_LIST,
        name: 'listAnimal',
        exact: true,
        private: true,
        component: ListAnimal
    },
    {
        path: ANIMAL_ADD,
        name: 'AddAnimal',
        exact: true,
        private: true,
        component: CreateAnimal
    },
    {
        path: ANIMAL_EDIT,
        name: 'editAnimal',
        exact: true,
        private: true,
        component: EditAnimal
    }
]
