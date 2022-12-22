import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { IUserCreateResponse, IUserRequest, IUserUpdate } from '../interfaces/users';

const userCreateSerializer: SchemaOf<IUserRequest> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    isAdm: yup.boolean().required()
});

const userResponseSerializer: SchemaOf<IUserCreateResponse> = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    isAdm: yup.boolean().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    isActive: yup.boolean().required()
});

const listUserSerializer: SchemaOf<IUserCreateResponse[]> = yup.array(userResponseSerializer)

const userUpdateSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup.string().notRequired()
});

export { userCreateSerializer, userResponseSerializer, listUserSerializer, userUpdateSerializer };