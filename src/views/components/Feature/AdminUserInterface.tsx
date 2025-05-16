export interface Admin {
    adminId: string;
    name: string;
    email: string;
    role: 'Admin' | 'Superadmin';
    status: 'Active' | 'Inactive';
}

export interface User {
    userId: string;
    name: string;
    email: string;
    department: string;
    status: 'Active' | 'Inactive';
}

export const admins: Admin[] = [
    {
        adminId: 'ADM-001',
        name: 'John Doe',
        email: 'john.doe@worksync.com',
        role: 'Superadmin',
        status: 'Active',
    },
    {
        adminId: 'ADM-002',
        name: 'Jane Smith',
        email: 'jane.smith@worksync.com',
        role: 'Admin',
        status: 'Active',
    },
];

export const users: User[] = [
    {
        userId: 'USR-001',
        name: 'Alice Johnson',
        email: 'alice.johnson@worksync.com',
        department: 'Engineering',
        status: 'Active',
    },
    {
        userId: 'USR-002',
        name: 'Bob Williams',
        email: 'bob.williams@worksync.com',
        department: 'Marketing',
        status: 'Inactive',
    },
];