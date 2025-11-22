import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const SALT_ROUNDS = 10;

const firstNames = ['Liam','Emma','Noah','Olivia','Ava','Isabella','Sophia','Mason','Lucas','Mia'];
const lastNames = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Martinez','Lopez'];
const petNames = ['Buddy','Max','Bella','Charlie','Luna','Lucy','Cooper','Rocky','Daisy','Bailey'];
const species = ['dog','cat','rabbit','parrot','hamster','turtle'];

const generateObjectId = () => new mongoose.Types.ObjectId();

const pick = (arr) => arr[Math.floor(Math.random()*arr.length)];

export async function generateUsers(count = 50) {
    const hashed = await bcrypt.hash('coder123', SALT_ROUNDS);
    const users = [];

    for (let i = 0; i < count; i++) {
        const fn = pick(firstNames);
        const ln = pick(lastNames);
        const role = Math.random() < 0.1 ? 'admin' : 'user';
        const email = `user${Date.now().toString().slice(-4)}_${i}@mocks.com`;

        users.push({
            _id: generateObjectId(),
            first_name: fn,
            last_name: ln,
            email,
            password: hashed,
            role,
            pets: []
        });
    }

    return users;
}

export function generatePets(count = 20, owners = []){
    const pets = [];

    for(let i=0;i<count;i++){
        const name = pick(petNames) + `_${i}`;
        const specie = pick(species);
        const owner = owners.length ? owners[Math.floor(Math.random()*owners.length)]._id : undefined;

        pets.push({
            _id: generateObjectId(),
            name,
            specie,
            birthDate: new Date(Date.now() - Math.floor(Math.random()*3*365*24*3600*1000)),
            adopted: false,
            owner,
            image: ''
        });
    }

    return pets;
}

export default {
    generateUsers,
    generatePets
};
