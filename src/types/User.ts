export interface User {
    id: string;
    fname: string;
    lname: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    isActive: boolean;
    createdAt: Date; // Timestamp when the user was created
    updatedAt: Date; // Timestamp when the user was last updated
}