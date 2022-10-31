import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    signUp() {
        return {mes : "Sign up"}
    }
}